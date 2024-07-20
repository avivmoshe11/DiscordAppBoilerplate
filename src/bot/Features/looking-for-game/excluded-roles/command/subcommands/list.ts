import { ChatInputCommandInteraction, Client, Role, SlashCommandSubcommandBuilder } from "discord.js";
import excludedRolesCollection from "../../excluded-roles-collection.js";
import EmbedUtilities from "../../../../../Utilities/embed-utilities.js";

export function listAction(client: Client, interaction: ChatInputCommandInteraction) {
  const cachedRoles = excludedRolesCollection.getCache();

  return EmbedUtilities.createAdvancedEmbed({
    title: "Excluded Roles List",
    description: "List of all excluded roles and matching name\nㅤ",
    fields: cachedRoles.map((role) => ({ name: `Role`, value: `<@&${role.id}>`, inline: false }))
  });
}

export function listBuilder(subcommand: SlashCommandSubcommandBuilder) {
  subcommand.setName("list");
  subcommand.setDescription("get a list of all excluded roles");

  return subcommand;
}
