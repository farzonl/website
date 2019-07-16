import { GithuRepoResponse } from "../types/Github";




export const GetReadMe = async (
  userName: string,
  repo: string,
  branch: string
) => {
  const response = await fetch(
    `https://raw.githubusercontent.com/${userName}/${repo}/${branch}/README.md`
  );
  return response.text();
};

export const GetRepos = async (userName: string) => {
  const response = await fetch(`https://api.github.com/users/${userName}/repos`);
  const json = await response.json();
  return json as GithuRepoResponse;
};


