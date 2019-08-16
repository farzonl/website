import { CauroselImages } from "../components/Caursel";
import { GridDirection } from "@material-ui/core/Grid";

export type GithuRepoResponse = GithubRepoItem[];

export interface GithubRepoItem {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description: null | string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: null | string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: null | string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url: null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: License | null;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: DefaultBranch;
  topics: string[];
}

export enum DefaultBranch {
  Master = "master"
}

export interface License {
  key: string;
  name: string;
  spdx_id: string;
  url: null | string;
  node_id: string;
}

export interface Owner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: Type;
  site_admin: boolean;
}

export enum Type {
  User = "User"
}

export interface GithubProfileResponse {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: null;
  hireable: null;
  bio: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
}

interface ConfigBaseItem {
  name: string;
  description: string;
  orientation: "top" | "bottom";
  barId: string;
}

export interface ConfigMediaSection {
  name: string;
  url: string;
  description: string;
  tag: string;
}

export type ConfigContentGridBlockItem = ConfigBaseItem & {
  type: "contentGrid";
  direction: GridDirection;
  items: AdditionalSectionsType[];
};

export type ConfigCauroselBlockItem = ConfigBaseItem & {
  type: "caurosel";
  images: CauroselImages;
};
export type ConfigTextBlockItem = ConfigBaseItem & { type: "textBlock" };
export type ConfigCollectionItem = ConfigBaseItem & {
  type: "collection";
  item: ConfigMediaSection[];
};
export type AdditionalSectionsType =
  | ConfigTextBlockItem
  | ConfigCollectionItem
  | ConfigCauroselBlockItem
  | ConfigContentGridBlockItem;

export interface GithubConfigResp {
  About: About;
  Skills: Skills;
  Resume: string;
  View: View;
  Github: GithubSettings;
  AdditionalSections?: AdditionalSectionsType[];
}

export interface GithubSettings {
  showForkedRepos: boolean;
  filterByTopics: boolean;
  showArchived: boolean;
}

export interface Foreground {
  colorName: string;
  intensity: number;
}

export interface View {
  Theme: string;
  Title: string;
  Foreground: Foreground;
  HeaderColor: string;
}

export type TechnicalPapers = {
  name: string;
  url: string;
  description: string;
  tag: string;
}[];

export interface About {
  Bio: string;
  Social: { [key: string]: string };
}

export interface Skills {
  Languages: any[];
  Frameworks: string[];
  Interests: string[];
  Tools: string[];
}
