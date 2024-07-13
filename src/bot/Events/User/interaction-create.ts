import { Client, CommandInteraction } from "discord.js";
import discordUtilities from "../../../Utilities/bot-utilities.js";

export default {
  name: "interactionCreate",
  async execute(interaction: CommandInteraction, client: Client) {
    commandHandler(interaction, client);
  }
};

function commandHandler(interaction: CommandInteraction, client: Client) {
  if (interaction.isChatInputCommand()) {
    discordUtilities.logTriggeredCommand(interaction.commandName);
    discordUtilities.getCommands()[interaction.commandName](interaction, client);
  }
}
