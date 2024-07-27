import { ChatInputCommandInteraction, Client, Role, SlashCommandSubcommandBuilder } from "discord.js";
import lfgRolesCollection from "../../lfg-roles-collection.js";
import EmbedUtilities from "../../../../../Utilities/embed-utilities.js";

export function listAction(client: Client, interaction: ChatInputCommandInteraction) {
  const cachedRoles = lfgRolesCollection.getCache();

  return EmbedUtilities.createAdvancedEmbed({
    title: "Lfg Roles List",
    description: "List of all lfg roles and matching name\nㅤ",
    fields: cachedRoles.map((role) => ({ name: `${role.name}`, value: `<@&${role.id}>`, inline: false }))
  });
}

export function listBuilder(subcommand: SlashCommandSubcommandBuilder) {
  subcommand.setName("list");
  subcommand.setDescription("get a list of all lfg roles");

  return subcommand;
}
