import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import HideAppBar from "./components/AppBar";
import AdvancedGridList, { GridItem } from "./components/ItemGrid";
import { GetReadMe, GetRepos, GetProfile } from "./requests/Github";
import { GithuRepoResponse, GithubProfileResponse } from "./types/Github";
import { ListSubheader, Typography, Avatar } from "@material-ui/core";
import Section from "./components/Section";
import ChipList from "./components/ChipList";
import Skills from "./components/Skills";
const App: React.FC = () => {
  const [readMe, setReadMe] = useState("");
  const [repos, setRepos] = useState<GridItem[]>([]);
  const [profile, setProfile] = useState<GithubProfileResponse>();

  const [languages, setLanguages] = useState<Set<string>>(new Set([]));
  useEffect(() => {
    const getReadMe = async () => {
      // const resp = await GetReadMe("afshawnlotfi", "circlepacker", "master");
      const repoResp = await GetRepos("afshawnlotfi");
      const profileResp = await GetProfile("afshawnlotfi");
      // console.log()
      setProfile(profileResp);
      setRepos(
        repoResp.map(repo => {
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
            body: repo.description ? repo.description : "",
            img: "https://github.com/afshawnlotfi/audaticaos/raw/master/ui1.png"
          };
        })
      );
    };
    getReadMe();
  });
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
              marginTop: 0,
              width: 300,
              height: 300
            }}
          />
          <div>
          <Typography style={{ color: "white" }} variant="h3" component="h2">
            I'm {(profile ? profile.name : "")}
          </Typography>

          <Typography style={{ color: "white" }} variant="subtitle1" component="h2">
           {(profile ? profile.bio : "")}
          </Typography>

          </div>

        </div>

        <Section
          sectionTitle="Skills"
          subtitleAfter={true}
          sectionDescription="Here are some of my skills. Feel free to filter by programming languages, frameworks, and development tools"
        >
          <div>
            <Skills
              programmingLangues={Array.from(languages)}
              frameworks={["hello"]}
              tools={["hello2"]}
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
