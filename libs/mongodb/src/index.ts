import { IDatabase } from '../../interfaces';

export class MongoDB implements IDatabase {
  url: string;
  username: string;
  password: string;

  constructor(name: string, username: string, password: string) {
    this.url = name;
    this.username = username;
    this.password = password;
  }

  reset(): Boolean {
    console.log('reset databases');
    return true;
  }
}
