export interface IDatabase {
  url: string
  username: string
  password: string
  reset: () => void
  // connect: () => void
}

// export function showMessage(): void {
//   console.log("Hello world2!\n");   
// }
