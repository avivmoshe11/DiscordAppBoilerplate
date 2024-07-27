import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, Client, Guild, GuildMember } from "discord.js";
import LfgUtilities from "../lfg-utilities.js";
import lfgBl from "../lfg-bl.js";

export default {
  data: getSlashCommand(),
  async execute(client: Client, interaction: ChatInputCommandInteraction) {
    const additionalInfo = LfgUtilities.extractAdditionalInfo(interaction.options.get("roles-and-info")?.value as string);
    const roleIds = LfgUtilities.extractRoleIds(interaction.options.get("roles-and-info")?.value as string);
    const strict = interaction.options.get("strict", false) ?? false;

    const response = await lfgBl.handleLfg(interaction, roleIds, additionalInfo, strict as boolean);
    await interaction.reply({ content: response, ephemeral: true });
  }
};

function getSlashCommand() {
  const slashCommand = new SlashCommandBuilder();
  slashCommand.setName("lfg");
  slashCommand.setDescription("Looking for game");
  slashCommand.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
  slashCommand.addStringOption((option) => option.setName("roles-and-info").setDescription("Roles to ping and additional info").setRequired(true));
  slashCommand.addBooleanOption((option) => option.setName("strict").setDescription("Must enforce complementary roles").setRequired(false));

  return slashCommand;
}
