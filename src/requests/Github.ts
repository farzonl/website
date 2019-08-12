import {
  Foreground,
  GithubConfigResp,
  GithubProfileResponse,
  GithuRepoResponse
} from "../types/Github";
import { cacheFetch } from "./RequestCacher";

export class ThemeProvider {
  public static theme =
    "linear-gradient(to right, rgb(162, 0, 255), rgb(89, 0, 255))";
  public static headerColor = "blue";
  public static foreground: Foreground = {
    colorName: "purple",
    intensity: 100
  };
}

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
