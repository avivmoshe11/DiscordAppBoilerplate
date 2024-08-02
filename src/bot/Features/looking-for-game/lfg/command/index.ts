import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, Client } from "discord.js";
import LfgUtilities from "../lfg-utilities.js";
import lfgBl from "../lfg-bl.js";

export default {
  data: getSlashCommand(),
  async execute(client: Client, interaction: ChatInputCommandInteraction) {
    await interaction.reply({ content: "Processing your request..." });
    const additionalInfo = LfgUtilities.extractAdditionalInfo(interaction.options.get("roles-and-info")?.value as string);
    const roleIds = LfgUtilities.extractRoleIds(interaction.options.get("roles-and-info")?.value as string);
    const strict = interaction.options.get("strict", false) ?? false;

    const response = await lfgBl.createLfg(interaction, roleIds, additionalInfo, strict as boolean);
    await interaction.channel?.send({ content: response });
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
