export interface IUser {
  avatar_url: string;
  id: string;
  events_url: string;
  followers_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  organizations_url: string;
  starred_url: string;
  subscription_url: string;
  url: string;
  login: string;
  name: string;
  location: string;
  followers: number;
  public_gists: number;
  public_repos: number;
  following: number;
  email?: string;
  bio: string;
  company: string;
  hireable: string;
  blog?: string;
  created_at: string;
  updated_at: string;
}
