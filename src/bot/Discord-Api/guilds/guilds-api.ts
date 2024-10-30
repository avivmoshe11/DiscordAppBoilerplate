import { Guild } from "discord.js";

class GuildsApi {
  protected guild: Guild;

  constructor(guild: Guild) {
    this.guild = guild;
  }

  public async resetGuildCommands() {
    await this.guild.commands.set([]);
  }
}

export default GuildsApi;
