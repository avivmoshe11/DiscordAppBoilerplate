import { ApplicationCommandDataResolvable, ApplicationCommandResolvable, RESTPostAPIChatInputApplicationCommandsJSONBody, Snowflake } from "discord.js";
import { ApplicationCommandManager, Client } from "discord.js";
import ApplicationApi from "../application-api.js";

class CommandsApi extends ApplicationApi {
  protected commandsManager: ApplicationCommandManager;

  constructor(client: Client) {
    super(client);
    this.commandsManager = this.clientApplication.commands;
  }

  public async setCommands(commands: RESTPostAPIChatInputApplicationCommandsJSONBody[], guildId?: Snowflake) {
    if (guildId) {
      return this.commandsManager.set(commands, guildId);
    } else {
      return this.commandsManager.set(commands);
    }
  }

  public async editCommand(command: ApplicationCommandResolvable, data: Partial<ApplicationCommandDataResolvable>) {
    return this.commandsManager.edit(command, data);
  }

  public async resetCommands() {
    return this.commandsManager.set([]);
  }
}

export default CommandsApi;
