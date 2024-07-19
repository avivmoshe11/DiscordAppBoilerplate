import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, Client, EmbedBuilder } from "discord.js";
import { addBuilder, addAction } from "./subcommands/add.js";
import { removeBuilder, removeAction } from "./subcommands/remove.js";
import { listAction, listBuilder } from "./subcommands/list.js";

export default {
  data: getSlashCommand(),
  async execute(client: Client, interaction: ChatInputCommandInteraction) {
    let response = "";
    let embed: EmbedBuilder | null = null;

    switch (interaction.options.getSubcommand()) {
      case "add":
        response = await addAction(client, interaction);
        break;

      case "remove":
        response = await removeAction(client, interaction);
        break;

      case "list":
        embed = listAction(client, interaction);
        break;
    }

    await interaction.reply({ content: response, ephemeral: true, embeds: embed ? [embed] : [] });
  }
};

function getSlashCommand() {
  const slashCommand = new SlashCommandBuilder();
  slashCommand.setName("lfg-role");
  slashCommand.setDescription("Handle the lfg roles");
  slashCommand.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
  slashCommand.addSubcommand((sub) => addBuilder(sub));
  slashCommand.addSubcommand((sub) => removeBuilder(sub));
  slashCommand.addSubcommand((sub) => listBuilder(sub));

  return slashCommand;
}
