import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, Client } from "discord.js";

export default {
  data: getSlashCommand(),
  async execute(client: Client, interaction: ChatInputCommandInteraction) {
    await interaction.reply({ content: "pong", ephemeral: true });
  }
};

function getSlashCommand() {
  const slashCommand = new SlashCommandBuilder();
  slashCommand.setName("ping");
  slashCommand.setDescription("Example ping pong command");
  slashCommand.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

  return slashCommand;
}
