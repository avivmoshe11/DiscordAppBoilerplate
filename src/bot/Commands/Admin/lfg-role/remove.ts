import { ChatInputCommandInteraction, Client, Role, SlashCommandSubcommandBuilder } from "discord.js";
import lfgRolesCollection from "../../../Features/looking-for-game/lfg-roles/lfg-roles-collection.js";

export async function removeAction(client: Client, interaction: ChatInputCommandInteraction) {
  const role = interaction.options.getRole("role") as Role;
  const cachedRole = lfgRolesCollection.getCachedRoles().find((lfgRole) => lfgRole.id === role.id);

  if (cachedRole) {
    await lfgRolesCollection.deleteRole(cachedRole.id);
  } else {
    return `Role <@&${role.id}> is not a lfg role.`;
  }

  return `Role <@&${role.id}> was deleted successfully!`;
}

export function removeBuilder(subcommand: SlashCommandSubcommandBuilder) {
  subcommand.setName("remove");
  subcommand.setDescription("Remove a LFG role.");
  subcommand.addRoleOption((role) => role.setName("role").setDescription("Role to remove").setRequired(true));

  return subcommand;
}
