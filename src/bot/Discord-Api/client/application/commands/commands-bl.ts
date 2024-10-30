import { Client, SlashCommandBuilder } from "discord.js";
import { CommandsCache } from "../../client-definitions.js";
import CommandsApi from "./commands-api.js";
import CommandsUtilities from "./commands-utilities.js";
import ClientBL from "../../client-bl.js";
import clientBl from "../../client-bl.js";

class CommandsBL {
  public async loadCommands(client: Client) {
    const commandFiles = await CommandsUtilities.getCommandFiles();
    const commands = [];
    const commandsCache: CommandsCache = {};

    for (const file of commandFiles) {
      commands.push(file.default.data.toJSON());
      commandsCache[file.default.data.name] = { action: file.default.execute, id: "" };
    }

    const commandsApi = new CommandsApi(client);
    const discordResponse = await commandsApi.setCommands(commands);
    ClientBL.updateCommandsCache(commandsCache, discordResponse);
  }

  public async editCommand(client: Client, name: string, data: SlashCommandBuilder) {
    const commandsApi = new CommandsApi(client);
    const command = clientBl.getCommands()[name];

    if (command) {
      await commandsApi.editCommand(command.id, data);
    }
  }
}

export default new CommandsBL();
