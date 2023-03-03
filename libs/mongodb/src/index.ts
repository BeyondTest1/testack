import { IDatabase } from 'testack-interfaces';
var fs = require('fs');
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

    if (fs.existsSync(this.fixtures_path)){
      this.fixtures = new Fixtures({mute: true, dir: this.fixtures_path });//`${path.join(__dirname, '..')}/fixtures`;

      if (!this.fixtures) {
        throw new Error('The `fixtures` property must be defined');
      }
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

    try {
      await mongoDB.fixtures.connect(mongoDB.DATABASE_URL, {useUnifiedTopology: true});
    }
    catch{
      console.log("testack-mongodb: fixtures can't connect to database")
    }

    return mongoDB;
  }

  async destroy() {
      try{
        if(this.fixtures)
          await this.fixtures.disconnect();
      }
      catch{
        console.log("testack-mongodb: failed to disconnect from fixtures")
      }
      try{
        await this.mongod?.stop();
      }
      catch{
        console.log("testack-mongodb: failed to disconnect from mongod")
      }
      
      
  }

  async reset(): Promise<Boolean> {
    if(this.fixtures)
      await this.fixtures.unload();

    return true;
  }
  async seed(): Promise<Boolean> {
    if(this.fixtures){
      await this.fixtures.unload();
      await this.fixtures.load();
    }

    return true;
  }

}
