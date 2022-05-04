import { CircularProgress, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import About from "./components/About";
import HideAppBar from "./components/AppBar";
import CauroselComponent from "./components/Caursel";
import CollectionComponent from "./components/Collection";
import { ContentGrid } from "./components/ContentGird";
import FullScreenDialog, { ReferenceItem } from "./components/FullScreenDialog";
import { GridItem } from "./components/ItemGrid";
import Section from "./components/Section";
import Skills from "./components/Skills";
import { TextBlock } from "./components/TextBlock";
import configRaw from "./config.json";

import {
  GetConfiguration,
  GetJSONFromUrl,
  GetProfile,
  GetReadMe,
  GetRepos,
  ThemeProvider
} from "./requests/Github";
import {
  AdditionalSectionsType,
  GithubConfigResp,
  GithubProfileResponse,
  GithubRepoItem
} from "./types/Github";

const configJson:{userName : string; groups : string[]} = configRaw;

const App: React.FC = () => {
  const [finishedLoading, changeFinishedLoading] = useState(false);

  const [repos, setRepos] = useState<GridItem[]>([]);
  const [refItem, setRefItem] = useState<ReferenceItem>();
  const [profile, setProfile] = useState<GithubProfileResponse>();
  const [config, setConfig] = useState<GithubConfigResp>();
  const [selectedLanguage, setSelectedLanguage] = useState<string>();
  const userName = configJson.userName;
  const groups = configJson.groups;
  const [languages, setLanguages] = useState<Set<string>>(new Set([]));
  const [lineNumbers, setLineNumbers] = useState<{ [key: string]: number }>({});
  const [topSections, setTopSections] = useState<AdditionalSectionsType[]>([]);
  const [bottomSections, setBottomSections] = useState<
    AdditionalSectionsType[]
  >([]);
  const updateSelectedLanguage = (newSelectedLanguage: string) => {
    if (selectedLanguage === newSelectedLanguage) {
      setSelectedLanguage("");
      return;
    }

    setSelectedLanguage(newSelectedLanguage);
  };

  document.title = config ? config.View.Title : "";
  //@ts-ignore
  document.body.style = config ? `background-image: ${config.View.Theme}` : "";

  useEffect(() => {
    const topSections =
      config && config.AdditionalSections
        ? config.AdditionalSections.filter(
            section => section.orientation === "top"
          )
        : [];
    const bottomSections =
      config && config.AdditionalSections
        ? config.AdditionalSections.filter(
            section => section.orientation === "bottom"
          )
        : [];
    setTopSections(topSections);
    setBottomSections(bottomSections);
    if (config) {
      if (config.View.Theme) {
        ThemeProvider.theme = config.View.Theme;
      }
      if (config.View.Foreground) {
        ThemeProvider.foreground = config.View.Foreground;
      }
      if (config.View.HeaderColor) {
        ThemeProvider.headerColor = config.View.HeaderColor;
      }
    }
  }, [config]);

  useEffect(() => {
    let filteredRepos: GithubRepoItem[] = [];

    const getRepoLangs = (repos: GithubRepoItem[]) => {
      let languageLineCount: { [key: string]: number } = {};

      const langPromises = repos.map(repo => {
        return GetJSONFromUrl(repo.languages_url) as {};
      });
      Promise.all(langPromises)
        .then(results => {
          // Handle results
          results.map((langObj: { [language: string]: number }) => {
            return Object.keys(langObj).map(language => {
              return (languageLineCount[language] = languageLineCount[language]
                ? langObj[language] + languageLineCount[language]
                : langObj[language]);
            });
          });
          let total = 0;
          Object.keys(languageLineCount).forEach(language => {
            total += languageLineCount[language];
          });
          languageLineCount.total = total;
          setLineNumbers(languageLineCount);
        })
        .catch(e => {
          console.error(e);
        });
    };

    const getContents = async () => {
      const configResp = await GetConfiguration(userName);
      const userResp = await GetRepos(userName);
      let repoResp: GithubRepoItem[] = [];
      if (userResp) {
        repoResp = [...userResp];
      }
      if (groups) {
        await Promise.all(groups.map(async group => {
          const groupEval = await GetRepos(group);
          if (groupEval) {
            repoResp = repoResp.concat(groupEval);
          }
        }));
      }

      const profileResp = await GetProfile(userName);
      
      if (configResp) setConfig(configResp);
      setProfile(profileResp);
      if (repoResp) {
        const nameFilter = (repos: GithubRepoItem[]) =>
          repos.filter(repo => {
            return !(
              repo.name === "website-config" ||
              repo.name.includes(".github.io") ||
              repo.name.includes("dotfiles")
            );
          });

        const archiveFilter = (repos: GithubRepoItem[]) =>
          configResp && configResp.Github && configResp.Github.showArchived
            ? repos
            : repos.filter(repo => {
                return !repo.archived;
              });

        const forkFiltered = (repos: GithubRepoItem[]) =>
          configResp && configResp.Github && configResp.Github.showForkedRepos
            ? repos
            : repos.filter(repo => {
                return !repo.fork;
              });

        const topicsFiltered = (repos: GithubRepoItem[]) =>
          configResp && configResp.Github && configResp.Github.filterByTopics
            ? repos.filter(repo => {
                return repo.topics.length > 0;
              })
            : repos;

        setRepos(
          nameFilter(archiveFilter(topicsFiltered(forkFiltered(repoResp))))
            .sort((repo1, repo2) => {
              let topicsSortWeight = 2;
              if(configResp && configResp.Github && configResp.Github.topicsSortWeight) {
                topicsSortWeight = configResp.Github.topicsSortWeight;
              }
              return (
                topicsSortWeight * repo1.topics.length +
                repo1.stargazers_count +
                repo1.watchers_count +
                repo1.forks_count -
                (topicsSortWeight * repo2.topics.length +
                  repo2.stargazers_count +
                  repo2.watchers_count +
                  repo2.forks_count)
              );
            })
            .reverse()

            .map(repo => {
              filteredRepos.push(repo);
              const language = repo.language ? repo.language : "No Code";
              if (repo.language) {
                setLanguages(oldLangs => {
                  return oldLangs.add(language);
                });
              }
              return {
                badgeName: language,
                likeCount: repo.stargazers_count,
                likeButtonAction: () => {
                  window.location.href = repo.html_url + "/stargazers";
                },
                itemButtonAction: () => {
                  const asyncFunc = async () => {
                    const markdown = await GetReadMe(repo.owner.login, repo.name);
                    setRefItem({
                      type: "repo",
                      name: repo.name,
                      body: markdown,
                      referenceUrl: repo.html_url
                    });
                  };
                  asyncFunc();
                },
                avatarUrl: repo.owner.avatar_url,
                subtitle: new Date(repo.updated_at).toDateString(),
                topics: repo.topics,
                title: repo.name,
                body: repo.description ? repo.description : ""
              };
            })
        );
        changeFinishedLoading(true);
      }

      getRepoLangs(filteredRepos);
    };
    getContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderConfigItem = (section: AdditionalSectionsType) => {
    switch (section.type) {
      case "collection":
        return (
          <CollectionComponent
            gridItems={section.item.map(media => {
              return {
                badgeName: media.tag,

                itemButtonAction: () => {
                  const asyncFunc = async () => {
                    setRefItem({
                      type: "pdf",
                      name: media.name,
                      referenceUrl: media.url
                    });
                  };
                  asyncFunc();
                },
                avatarUrl: profile ? profile.avatar_url : "",
                subtitle: "",
                title: media.name,
                body: media.description
              };
            })}
          />
        );

      case "caurosel":
        return <CauroselComponent images={config ? section.images : []} />;

      case "contentGrid":
        return (
          <ContentGrid
            direction={section.direction}
            componentGenerator={section.items.map((section, i) => () =>
              renderConfigItem(section)
            )}
          />
        );

      case "textBlock":
        return <TextBlock description={section.description} />;
    }
  };
  let filterFunc = el => {
    return el.barId !== undefined && el.barId !== null && el.barId !== "";
  };
  let filteredTopSec = topSections.filter(filterFunc);
  let filteredBottomSec = bottomSections.filter(filterFunc);
  return finishedLoading ? (
    <HideAppBar
      sideButtion={{ title: "Skills" }}
      buttons={[
        ...[{ title: "About" }],
        ...filteredTopSec.map(section => {
          return { title: section.barId };
        }),
        ...[{ title: "Skills" }, { title: "Projects" }],
        ...filteredBottomSec.map(section => {
          return { title: section.barId };
        }),
        ...[
          {
            title: "Blog",
            onClick: () => {
              if (config && config.Blog) {
                window.open(config.Blog, "_blank")
              }
            }
          },
          {
            title: "Resume",
            onClick: () => {
              setRefItem({
                type: "pdf",
                name: "Resume",
                referenceUrl: `${config ? config.Resume : ""}`
              });
            }
          }
        ]
      ]}
    >
      <div>
        <FullScreenDialog referenceItem={refItem} />

        <About profile={profile} config={config} />

        {topSections.map((section, id) => {
          return (
            <Section
              key={id}
              id={section.barId}
              sectionTitle={section.name}
              subtitleAfter={false}
              sectionDescription={
                section.type === "textBlock" ? "" : section.description
              }
            >
              {renderConfigItem(section)}
            </Section>
          );
        })}

        <Section
          id="Skills"
          sectionTitle="Skills"
          subtitleAfter={true}
          sectionDescription="Here are some of my skills. Feel free to filter by programming languages, frameworks, and development tools"
        >
          <div>
            <Skills
              lineNumbers={lineNumbers}
              selectedLanguageUpdate={updateSelectedLanguage}
              programmingLangues={[
                ...Array.from(languages),
                ...(config ? config.Skills.Languages : [])
              ]}
              frameworks={
                config && config.Skills.Frameworks
                  ? config.Skills.Frameworks
                  : []
              }
              interests={
                config && config.Skills.Interests ? config.Skills.Interests : []
              }
              tools={config && config.Skills.Tools ? config.Skills.Tools : []}
            />
          </div>
        </Section>

        <Section
          id="Projects"
          sectionTitle="Featured Projects"
          subtitleAfter={false}
          sectionDescription="Here are some featured personal projects of mine"
        >
          <CollectionComponent
            gridItems={repos.filter(repo => {
              if (selectedLanguage) {
                return (
                  (repo.topics &&
                    repo.topics.includes(
                      selectedLanguage.replace(/\s+/g, "-").toLowerCase()
                    )) ||
                  repo.badgeName === selectedLanguage
                ); //If selected is is same language
              } else {
                return true; // Nothing has been selected
              }
            })}
          />
        </Section>

        {bottomSections.map((section, id) => {
          return (
            <Section
              key={id}
              id={section.barId}
              sectionTitle={section.name}
              subtitleAfter={false}
              sectionDescription={section.description}
            >
              {renderConfigItem(section)}
            </Section>
          );
        })}
      </div>
    </HideAppBar>
  ) : (
    <div>
      <CircularProgress
        style={{
          display: "block",
          marginRight: "auto",
          marginLeft: "auto",
          marginTop: "20%"
        }}
        size="20%"
      />

      <Typography
        style={{
          textAlign: "center",
          marginTop: 30
        }}
        variant="subtitle1"
        component="h2"
      >
        One second just grabbing a few things
      </Typography>
    </div>
  );
};

export default App;
