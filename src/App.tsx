import React, { useEffect, useState } from "react";
import "./App.css";
import HideAppBar from "./components/AppBar";
import AdvancedGridList, { GridItem } from "./components/ItemGrid";
import { GetRepos, GetProfile, GetConfiguration, GetReadMe } from "./requests/Github";
import { GithubProfileResponse, GithubConfigResp } from "./types/Github";
import Section from "./components/Section";
import Skills from "./components/Skills";
import About from "./components/About";
import FullScreenDialog, { ReferenceItem } from "./components/FullScreenDialog"
const App: React.FC = () => {
  const [] = useState("");
  const [repos, setRepos] = useState<GridItem[]>([]);
  const [refItem, setRefItem] = useState<ReferenceItem>()
  const [profile, setProfile] = useState<GithubProfileResponse>();
  const [config, setConfig] = useState<GithubConfigResp>();
  const userName = "afshawnlotfi"
  const [languages, setLanguages] = useState<Set<string>>(new Set([]));
  useEffect(() => {
    const getContents = async () => {
      const configResp = await GetConfiguration(userName);
      const repoResp = await GetRepos(userName);
      const profileResp = await GetProfile(userName);
      if (configResp) setConfig(configResp);
      setProfile(profileResp);

      setRepos(
        repoResp
          .filter(repo =>
            repo.description ? repo.description.startsWith("[F]") : false
          )
          .map(repo => {
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
                  const markdown = await GetReadMe(userName, repo.name)
                  setRefItem({
                    type : "repo",
                    name : repo.name,
                    body : markdown,
                    referenceUrl : repo.html_url
                  })
                }
                asyncFunc()
              },
              avatarUrl: repo.owner.avatar_url,
              subtitle: new Date(repo.updated_at).toDateString(),
              title: repo.name,
              body: repo.description ? repo.description.substring(3) : ""
            };
          })
      );
    };
    getContents();
  }, []);
  return (
    <HideAppBar
      sideButtion={{ title: "Skills" }}
      buttons={[
        { title: "About" },
        { title: "Skills" },
        { title: "Projects" },
        { title: "Papers" },
        { title: "Resume" }
      ]}
    >
      <div>
      <FullScreenDialog referenceItem={refItem}></FullScreenDialog>

        <About profile={profile} config={config}/>

        <Section
          id="Skills"
          sectionTitle="Skills"
          subtitleAfter={true}
          sectionDescription="Here are some of my skills. Feel free to filter by programming languages, frameworks, and development tools"
        >
          <div>
            <Skills
              programmingLangues={
                config
                  ? [...Array.from(languages), ...config.Skills.Languages]
                  : Array.from(languages)
              }
              frameworks={config ? config.Skills.Frameworks : []}
              tools={config ? config.Skills.Tools : []}
            />
          </div>
        </Section>

        <Section
          id="Projects"
          sectionTitle="Featured Projects"
          subtitleAfter={false}
          sectionDescription="Here are some featured personal projects of mine"
        >
          <AdvancedGridList gridItems={repos} />
        </Section>


        <Section
          id="Papers"
          sectionTitle="Technical Papers"
          subtitleAfter={false}
          sectionDescription="Here are some featured technical papers of mine"
        >
            <AdvancedGridList gridItems={(config) ? (config.TechnicalPapers.map((paper) => {
              return {
                badgeName: paper.tag,
  
                itemButtonAction: () => {
                  const asyncFunc = async () => {
                    setRefItem({
                      type : "pdf",
                      name : paper.name,
                      referenceUrl : paper.url
                    })
                  }
                  asyncFunc()
                },
                avatarUrl: (profile) ? profile.avatar_url : "",
                subtitle: "",
                title: paper.name,
                body: paper.description
              };
            })) : [] } />
        </Section>



      </div>
    </HideAppBar>
  );
};

export default App;
          // {/* <ItemGridList /> */}
