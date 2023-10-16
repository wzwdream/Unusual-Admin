export type Languages = {
  TypeScript: number
  Vue: number
  JavaScript: number
  CSS: number
  HTML: number,
  SCSS: number
}

export type Info = {
  description: string
  svn_url: string
  stargazers_count: number
  forks_count: number
  [key: string]: any
}

export type Commit = {
  commit: {
    author: {
      name: string,
      email: string,
      date: string
    },
    message: string,
    [key: string]: any
  }
  [key: string]: any
}

export type Views = {
  count: number
  uniques: number
  views: Array<{
    timestamp: string,
    count: number,
    uniques: number
  }>
}