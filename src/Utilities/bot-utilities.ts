import dotenv from "dotenv";
import clientBl from "../bot/Features/client/client-bl.js";
dotenv.config();

class BotUtilities {
  public async initializeBot() {
    await clientBl.initialize();
  }
}

export default new BotUtilities();
