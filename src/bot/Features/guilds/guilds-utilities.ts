import { ChatInputCommandInteraction, Guild } from "discord.js";

class GuildsUtilities {
  public static getCommandInteractionGuild(interaction: ChatInputCommandInteraction) {
    return interaction.guild as Guild;
  }
}

export default GuildsUtilities;
