import botUtilities from "./bot-utilities.js";
import mongoUtilities from "./mongo-utilities.js";

class AppLoader {
  public async initialize() {
    await mongoUtilities.connectToDB();
    await botUtilities.initializeBot();
  }
}

export default new AppLoader();
