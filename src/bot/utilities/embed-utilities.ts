import { EmbedObject, AdvancedEmbedObject } from "../Interfaces/embed-interfaces";
import { EmbedBuilder } from "discord.js";
import configuration from "../bot-configuration.js";

class EmbedUtilities {
  public static createEmbed(settings: EmbedObject): EmbedBuilder {
    const { color = "#ffec94", title = null, description = null, fields = [] } = settings;
    return new EmbedBuilder().setColor(color).setTitle(title).setDescription(description).addFields(fields);
  }

  public static createAdvancedEmbed(settings: AdvancedEmbedObject): EmbedBuilder {
    const { color = "#ffec94", author = null, title = null, thumbnail = null, url = null, description = null, fields = [], footer = null } = settings;

    const creditFooter = {
      text: `Made by ${configuration.developer.userName}`,
      iconURL: configuration.developer.iconUrl
    };

    return new EmbedBuilder()
      .setColor(color)
      .setTitle(title)
      .setURL(url)
      .setAuthor(author ? { name: `${author}` } : null)
      .setThumbnail(thumbnail)
      .setDescription(description)
      .setFields(fields)
      .setTimestamp()
      .setFooter(footer ?? creditFooter);
  }
}
export default EmbedUtilities;
