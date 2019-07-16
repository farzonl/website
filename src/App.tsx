import React, { useEffect, useState } from "react";
import "./App.css";
import HideAppBar from "./components/AppBar";
import AdvancedGridList, { GridItem } from "./components/ItemGrid";
import { GetRepos, GetProfile, GetConfiguration } from "./requests/Github";
import { GithubProfileResponse, GithubConfigResp } from "./types/Github";
import { Typography, Avatar, Paper } from "@material-ui/core";
import Section from "./components/Section";
import Skills from "./components/Skills";
const App: React.FC = () => {
  const [] = useState("");
  const [repos, setRepos] = useState<GridItem[]>([]);
  const [profile, setProfile] = useState<GithubProfileResponse>();
  const [config, setConfig] = useState<GithubConfigResp>();

  const [languages, setLanguages] = useState<Set<string>>(new Set([]));
  useEffect(() => {
    const getReadMe = async () => {
      const configResp = await GetConfiguration("afshawnlotfi");
      const repoResp = await GetRepos("afshawnlotfi");
      const profileResp = await GetProfile("afshawnlotfi");
      if (configResp) setConfig(configResp);
      setProfile(profileResp);

      setRepos(
        repoResp.filter((repo) => (repo.description) ? repo.description.startsWith("[F]") : false).map(repo => {
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
              window.location.href = repo.html_url;
            },
            avatarUrl: repo.owner.avatar_url,
            subtitle: new Date(repo.updated_at).toDateString(),
            title: repo.name,
            body: repo.description ? repo.description.substring(3) : "",
          };
        })
      );
    };
    getReadMe();
  }, []);
  return (
    <HideAppBar buttons={[{ title: "Home", link: "" }]}>
      <div>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <Avatar
            alt={profile ? profile.name : ""}
            src={profile ? profile.avatar_url : ""}
            style={{
              // marginTop:10,
              minWidth:120,
              minHeight:100,
              maxWidth:150,
              maxHeight:150,
              width: "20%",
              height: "20%"
            }}
          />
          <div style={{ marginLeft : "2%", marginTop: "3%" }}>

          <Typography style={{ color: "white" }} variant="h3" component="h2">
            I'm {(profile ? profile.name : "")}
          </Typography>

          <Typography style={{ color: "white" }} variant="subtitle1" component="h2">
           {(profile ? profile.bio : "")}
          </Typography>

          </div>

        </div>

        {(config) ? (<div style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}>
          <Paper style={{  width : "70%", backgroundColor: "rgba(255,255,255,0.8)" }}>
            <Paper style={{ padding: 20, backgroundColor: "transparent" }}>
              <Typography component="p">
                {config ? config.About.Bio : ""}
              </Typography>
            </Paper>
          </Paper>
        </div>) : config}

        <Section
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
          sectionTitle="Featured Projects"
          subtitleAfter={false}
          sectionDescription="Here are some featured personal projects of mine"
        >
          <AdvancedGridList gridItems={repos} />
        </Section>
      </div>
    </HideAppBar>
  );
};

export default App;
