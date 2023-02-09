import { IDatabase } from '../../interfaces';

export class MongoDB implements IDatabase  {
  provider = "MongoDB";
  host = "localhost";
  port = 27017;
  user = "";
  password = "";

  constructor(config: IDatabase, options:any) {
    Object.assign(this, config, options);
  }

  reset(): Boolean {
    console.log('reset databases');
    return true;
  }
}
