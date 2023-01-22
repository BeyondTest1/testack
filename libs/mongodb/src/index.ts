import { IDatabase } from '../../interfaces';

export class MongoDB implements IDatabase {
  name: string;
  url: string;
  username: string;
  password: string;

  constructor({url="url",   username="", password=""}:{url?: string, username?: string, password?: string}) {
  //   { 
  //     providers = [], 
  //     configPath = "~/.example.config.js"
  // }: Config //{ name?: string; age?: number }

    this.name = "MongoDB";
    this.url = url;
    this.username = username;
    this.password = password;
  }

  reset(): Boolean {
    console.log('reset databases');
    return true;
  }
}
