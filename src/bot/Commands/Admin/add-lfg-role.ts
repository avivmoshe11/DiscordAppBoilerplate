import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, Client } from "discord.js";

export default {
  data: getSlashCommand(),
  execute(client: Client, interaction: ChatInputCommandInteraction) {
    interaction.reply({ content: "Pong", ephemeral: true });
  }
};

function getSlashCommand() {
  const slashCommand = new SlashCommandBuilder();
  slashCommand.setName("add-lfg-role");
  slashCommand.setDescription("Set a new LFG role.");
  slashCommand.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
  slashCommand.addRoleOption((role) => role.setName("role").setDescription("Role to add"));
  slashCommand.addStringOption((name) => name.setName("name").setDescription("Name of the role"));

  return slashCommand;
}
