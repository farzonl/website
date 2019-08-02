import {
  GithuRepoResponse,
  GithubProfileResponse,
  GithubConfigResp
} from "../types/Github";
import { cacheFetch } from "./RequestCacher";

const expirationTime = 1000 * 60 * 20;

export const GetProfile = async (userName: string) => {
  return cacheFetch<GithubProfileResponse>(
    expirationTime,
    `https://api.github.com/users/${userName}`
  );
};

export const GetConfiguration = async (userName: string) => {
  return cacheFetch<GithubConfigResp>(
    expirationTime,
    `https://raw.githubusercontent.com/${userName}/website-config/master/config.json`
  );
};

export const GetReadMe = async (userName: string, repo: string) => {
  return cacheFetch<string>(
    expirationTime,
    `https://raw.githubusercontent.com/${userName}/${repo}/master/README.md`,
    undefined,
    true
  );
};

export const GetRepos = async (userName: string) => {
  return cacheFetch<GithuRepoResponse>(
    expirationTime,
    `https://api.github.com/users/${userName}/repos?per_page=100`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.mercy-preview+json"
      }
    }
  );
};

export const GetJSONFromUrl = async (url: string) => {
  return cacheFetch(expirationTime, url);
};
