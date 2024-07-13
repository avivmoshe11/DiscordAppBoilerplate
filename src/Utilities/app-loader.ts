import discordUtilities from "./bot-utilities.js";
import mongoUtilities from "./mongo-utilities.js";

class AppLoader {
  public async initialize() {
    await mongoUtilities.connectToDB();
    await discordUtilities.initialize();
  }
}

export default new AppLoader();
