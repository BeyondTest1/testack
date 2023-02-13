import { IDatabase } from '../../interfaces';
const Fixtures = require('node-mongodb-fixtures');

export class MongoDB implements IDatabase  {
  provider = "MongoDB";
  host = "localhost";
  port = 27017;
  user = "";
  password = "";
  dbName = "db"
  fixtures = new Fixtures({mute: true});

  DATABASE_URL = '';

  constructor(config: IDatabase, options:any) {
    if (!this.fixtures) {
      throw new Error('The `fixtures` property must be defined');
    }
    Object.assign(this, config, options);

    this.DATABASE_URL = `mongodb://${this.host}:${this.port}/${this.dbName}`
    this.fixtures = new Fixtures({mute: true});
  }


  async reset(): Promise<Boolean> {
    await this.fixtures.connect(this.DATABASE_URL, {useUnifiedTopology: true});
    await this.fixtures.unload();
    // await this.fixtures.load();
    await this.fixtures.disconnect();

    return true;
  }
  async seed(): Promise<Boolean> {
    await this.fixtures.connect(this.DATABASE_URL, {useUnifiedTopology: true});
    await this.fixtures.unload();
    await this.fixtures.load();
    await this.fixtures.disconnect();

    return true;
  }

}
