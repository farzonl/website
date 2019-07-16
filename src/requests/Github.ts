import { GithuRepoResponse, GithubProfileResponse, GithubConfigResp } from "../types/Github";




export const GetProfile = async (userName: string) => {
  const response = await fetch(`
  https://api.github.com/users/${userName}`);
  const json = await response.json();
  return json as GithubProfileResponse;
};



export const GetConfiguration = async (
  userName: string,
) => {
  const response = await fetch(
    `https://raw.githubusercontent.com/${userName}/website-config/master/config.json`
  );
  try{
    const json = await response.json();
    return json as GithubConfigResp

  }catch(error){
    return null
  }
}

export const GetReadMe = async (
  userName: string,
  repo : string
) => {
  const response = await fetch(
    `https://raw.githubusercontent.com/${userName}/${repo}/master/README.md`
  );
  return response.text()

}


export const GetRepos = async (userName: string) => {
  const response = await fetch(`https://api.github.com/users/${userName}/repos`);
  const json = await response.json();
  return json as GithuRepoResponse;
};


