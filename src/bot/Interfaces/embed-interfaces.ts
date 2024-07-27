import { ColorResolvable, EmbedFooterData } from "discord.js";

export interface EmbedObject {
  color?: ColorResolvable;
  title?: string;
  description?: string;
  fields?: EmbedField[];
}

export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface AdvancedEmbedObject extends EmbedObject {
  footer?: Omit<EmbedFooterData, "proxyIconURL">;
  thumbnail?: string;
  url?: string;
  author?: string;
}
