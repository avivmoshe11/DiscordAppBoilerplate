import * as mongodb from "mongodb";
import configuration from "../configuration.js";
import consoleUtilities from "./console-utilities.js";

class MongoUtilities {
  private _db: mongodb.Db | null = null;
  private _client: mongodb.MongoClient | null = null;

  public connectToDB() {
    return new Promise(async (resolve, reject) => {
      this.databaseLog("Connecting to DB...");

      const dbName = `${configuration.mongo.scheme}-${process.env.NODE_ENV}`;
      const urlWithSchema = this.addSchemaToUrl(configuration.mongo.url as string, dbName);
      const mongoClient = new mongodb.MongoClient(urlWithSchema);

      try {
        const client = await mongoClient.connect();

        this._client = client;
        this._db = this._client.db(dbName);
        this.databaseLog(`Connected to DB ${dbName}`);

        resolve(this._db);
      } catch (err) {
        this.databaseError(`Failed to connect to DB. rejecting ${err}`);
        reject(err);
      }
    });
  }

  public addSchemaToUrl(url: string, schema: string) {
    return `${url}/${schema}-${process.env.NODE_ENV}`;
  }

  public getClient() {
    return this._client;
  }

  public getDB() {
    return this._db;
  }

  public async getCollection(collectionName: string) {
    return this._db?.collection(collectionName);
  }

  public isIdValid(id: any) {
    return (typeof id === "string" && (id.length === 12 || /^[\da-f]{24}$/i.test(id))) || (typeof id === "number" && Number.isInteger(id));
  }

  private databaseLog(msg: string) {
    consoleUtilities.log(msg, "DATABASE", "app-load-process");
  }

  private databaseError(msg: string) {
    consoleUtilities.error(msg, "DATABASE", "app-load-process");
  }
}

export default new MongoUtilities();
