import { Guild } from "discord.js";

class GuildsAPI {
  protected guild: Guild;

  constructor(guild: Guild) {
    this.guild = guild;
  }
}

export default GuildsAPI;
