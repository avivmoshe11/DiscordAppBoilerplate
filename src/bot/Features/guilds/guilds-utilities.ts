import { ChatInputCommandInteraction } from "discord.js";

class GuildsUtilities {
  public static getCommandInteractionGuild(interaction: ChatInputCommandInteraction) {
    return interaction.guild;
  }
}

export default GuildsUtilities;
