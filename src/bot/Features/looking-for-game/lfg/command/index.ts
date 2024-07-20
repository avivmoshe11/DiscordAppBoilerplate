import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, Client, EmbedBuilder } from "discord.js";

export default {
  data: getSlashCommand(),
  async execute(client: Client, interaction: ChatInputCommandInteraction) {
    let embed: EmbedBuilder | null = null;
    console.log(interaction.options.get("roles"));

    await interaction.reply({ content: "", ephemeral: true });
  }
};

function getSlashCommand() {
  const slashCommand = new SlashCommandBuilder();
  slashCommand.setName("lfg");
  slashCommand.setDescription("Looking for game");
  slashCommand.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
  slashCommand.addStringOption((option) => option.setName("roles").setDescription("Roles to ping (will only address the roles).").setRequired(true));

  return slashCommand;
}
