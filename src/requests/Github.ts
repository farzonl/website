import { GithuRepoResponse, GithubProfileResponse, GithubConfigResp } from "../types/Github";
import {cacheFetch} from "./RequestCacher"



export const GetProfile = async (userName: string) => {
  return cacheFetch<GithubProfileResponse>(`
  https://api.github.com/users/${userName}`);

};



export const GetConfiguration = async (
  userName: string,
) => {
  return cacheFetch<GithubConfigResp>(
    `https://raw.githubusercontent.com/${userName}/website-config/master/config.json`
  );
}

export const GetReadMe = async (
  userName: string,
  repo : string
) => {
  return cacheFetch<string>(
    `https://raw.githubusercontent.com/${userName}/${repo}/master/README.md`, undefined,  true);

}


export const GetRepos = async (userName: string) => {
  return cacheFetch<GithuRepoResponse>(`https://api.github.com/users/${userName}/repos?per_page=100`, {

    headers: {
      'Content-Type': 'application/json',
      'Accept' : "application/vnd.github.mercy-preview+json"
  },


  });
};

export const GetJSONFromUrl = async (url : string) => {
  return cacheFetch(url)
};

