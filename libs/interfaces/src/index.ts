export interface IDatabase {
  name: string
  url: string
  username: string
  password: string
  reset: () => void
  // connect: () => void
}