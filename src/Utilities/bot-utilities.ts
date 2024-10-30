import dotenv from "dotenv";
import clientBl from "../bot/Discord-Api/client/client-bl.js";
dotenv.config();

class BotUtilities {
  public async initializeBot() {
    await clientBl.initialize();
  }
}

export default new BotUtilities();
