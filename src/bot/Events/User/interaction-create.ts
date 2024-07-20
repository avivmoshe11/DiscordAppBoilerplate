import { Client, CommandInteraction } from "discord.js";
import CommandsUtilities from "../../Features/client/application/commands/commands-utilities.js";
import clientBl from "../../Features/client/client-bl.js";
import botConsoleUtilities from "../../../Utilities/console/bot-console-utilities.js";

export default {
  name: "interactionCreate",
  async execute(client: Client, interaction: CommandInteraction) {
    commandHandler(client, interaction);
  }
};

async function commandHandler(client: Client, interaction: CommandInteraction) {
  if (interaction.isChatInputCommand()) {
    const subCommand = interaction.options.getSubcommand(false);
    CommandsUtilities.logCommandTriggered(interaction.commandName.concat(subCommand ? ` (sub-command) ${subCommand}` : ""));

    try {
      await clientBl.getCommands()[interaction.commandName].action(client, interaction);
    } catch (error) {
      CommandsUtilities.logCrashedCommand(interaction.commandName, error);
    }
  }
}
