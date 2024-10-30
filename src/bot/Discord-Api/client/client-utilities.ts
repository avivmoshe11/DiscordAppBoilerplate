import { Client, GatewayIntentBits, Partials } from "discord.js";

class ClientUtilities {
  public static create(intents: GatewayIntentBits[], partials: Partials[]) {
    return new Client({ intents, partials });
  }
}

export default ClientUtilities;
