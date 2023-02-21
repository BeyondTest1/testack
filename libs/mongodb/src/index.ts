import { IDatabase } from 'testack-interfaces';
var path = require('path');
const Fixtures = require('node-mongodb-fixtures');

export class MongoDB implements IDatabase  {
  provider = "MongoDB";
  host = "localhost";
  port = 27017;
  user = "";
  password = "";
  dbName = "db"
  inMemory = false
  
  fixtures = new Fixtures({mute: true, dir: `${path.join(__dirname, '..')}/fixtures`});
  mongod:any;
  destructor:any;
  DATABASE_URL = '';

  private constructor(config: IDatabase, options:any) {
    if (!this.fixtures) {
      throw new Error('The `fixtures` property must be defined');
    }
    Object.assign(this, config, options);
    // this.fixtures = new Fixtures({mute: true});
  }

  static async create(config: IDatabase, options: any): Promise<MongoDB> {
    const mongoDB = new MongoDB(config, options);
    const { MongoMemoryServer } = require('mongodb-memory-server')
    if(mongoDB.inMemory){
      mongoDB.mongod = await MongoMemoryServer.create();
      mongoDB.host = mongoDB.mongod._instanceInfo.ip;
      mongoDB.port = mongoDB.mongod._instanceInfo.port;

    }
    mongoDB.DATABASE_URL = `mongodb://${mongoDB.host}:${mongoDB.port}/${mongoDB.dbName}`;
    return mongoDB;
  }

  async destroy() {
      await this.mongod?.stop();
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
