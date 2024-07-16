import { ChatInputCommandInteraction, Client, Role, SlashCommandSubcommandBuilder } from "discord.js";
import lfgRolesCollection from "../../../Features/looking-for-game/lfg-roles/lfg-roles-collection.js";
import EmbedUtilities from "../../../Utilities/embed-utilities.js";

export async function listAction(client: Client, interaction: ChatInputCommandInteraction) {
  const cachedRoles = lfgRolesCollection.getCachedRoles();

  return EmbedUtilities.createAdvancedEmbed({
    title: "LFG Roles List",
    description: "List of all lfg roles and matching name\n",
    fields: cachedRoles.map((role) => ({ name: `${role.name}`, value: `<@&${role.id}>`, inline: false }))
  });
}

export function listBuilder(subcommand: SlashCommandSubcommandBuilder) {
  subcommand.setName("list");
  subcommand.setDescription("get a list of all lfg roles");

  return subcommand;
}
