import { Snowflake } from "discord.js";
import { BaseEntity } from "../../abstract/base-collection-definitions.js";
import { LfgRole } from "../lfg-roles/lfg-roles-definitions.js";

export type LfgPost = {
  requestId: string; //uuid
  userId: Snowflake;
  channelId: Snowflake;
  lfgRole: LfgRole;
  complementaryRoles: Array<Snowflake>;
  voiceChannelId?: Snowflake;
  messageId: Snowflake;
};

export type LfgPostEntity = LfgPost & BaseEntity;
