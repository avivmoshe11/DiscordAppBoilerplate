import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, Client } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("add-lfg-role")
    .setDescription("Set a new lfg role.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  execute(interaction: ChatInputCommandInteraction, client: Client) {
    interaction.reply({ content: "Pong", ephemeral: true });
  }
};
