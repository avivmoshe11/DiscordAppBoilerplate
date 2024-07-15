import { Client, CommandInteraction } from "discord.js";
import CommandsUtilities from "../../Features/client/application/commands/commands-utilities.js";
import clientBl from "../../Features/client/client-bl.js";

export default {
  name: "interactionCreate",
  async execute(client: Client, interaction: CommandInteraction) {
    commandHandler(client, interaction);
  }
};

function commandHandler(client: Client, interaction: CommandInteraction) {
  if (interaction.isChatInputCommand()) {
    CommandsUtilities.logCommandTriggered(interaction.commandName);
    clientBl.getCommands()[interaction.commandName].action(client, interaction);
  }
}
