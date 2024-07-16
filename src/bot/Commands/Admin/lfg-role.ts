import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, Client } from "discord.js";
import { addBuilder, addAction } from "./lfg-role/add.js";
import { removeBuilder, removeAction } from "./lfg-role/remove.js";

export default {
  data: getSlashCommand(),
  async execute(client: Client, interaction: ChatInputCommandInteraction) {
    let response = "";

    switch (interaction.options.getSubcommand()) {
      case "add":
        response = await addAction(client, interaction);
        break;

      case "remove":
        response = await removeAction(client, interaction);
        break;
    }

    await interaction.reply({ content: response, ephemeral: true });
  }
};

function getSlashCommand() {
  const slashCommand = new SlashCommandBuilder();
  slashCommand.setName("lfg-role");
  slashCommand.setDescription("Handle the lfg roles");
  slashCommand.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
  slashCommand.addSubcommand((sub) => addBuilder(sub));
  slashCommand.addSubcommand((sub) => removeBuilder(sub));

  return slashCommand;
}
