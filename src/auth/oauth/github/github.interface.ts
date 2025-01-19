export interface GithubUser {
  id: number
  username: string
  email: string | null
  name: string | null
  avatar_url: string
  bio: string | null
  location: string | null
  blog: string | null
  created_at: string
  updated_at: string
}

export interface GithubAuthResponse {
  access_token: string
  user: GithubUser
}
