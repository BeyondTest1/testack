import { IDatabase } from 'testack-interfaces';
var path = require('path');
const Fixtures = require('node-mongodb-fixtures');

export class MongoDB implements IDatabase  {
  provider = "MongoDB";
  host = "127.0.0.1";
  port = 27017;
  user = "";
  password = "";
  dbName = "db"
  inMemory = false
  fixtures_path = "fixtures"
  fixtures:any;
  mongod:any;
  destructor:any;
  DATABASE_URL = '';

  private constructor(config: IDatabase, options:any) {
    this.fixtures_path = config?.fixtures_path || this.fixtures_path;
    this.fixtures = new Fixtures({mute: true, dir: this.fixtures_path });//`${path.join(__dirname, '..')}/fixtures`;
    
    if (!this.fixtures) {
      throw new Error('The `fixtures` property must be defined');
    }
    Object.assign(this, config, options);
  }

  static async create(config: IDatabase, options: any): Promise<MongoDB> {
    const mongoDB = new MongoDB(config, options);
    const { MongoMemoryServer } = require('mongodb-memory-server')
    
    if(mongoDB.inMemory){
      mongoDB.mongod = await MongoMemoryServer.create({
        instance: {
          dbName: mongoDB.dbName,
          // port: mongoDB.port,
          ip: mongoDB.host 
        }
      });
      mongoDB.port = mongoDB.mongod._instanceInfo.port;
    }
    
    mongoDB.DATABASE_URL = `mongodb://${mongoDB.host}:${mongoDB.port}/${mongoDB.dbName}`;
    return mongoDB;
  }

  async destroy() {
      await this.mongod?.stop();
      this.fixtures = undefined
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
