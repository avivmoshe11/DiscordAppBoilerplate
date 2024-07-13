import { EmbedObject, AdvancedEmbedObject } from "../Interfaces/embed-interfaces";
import { EmbedBuilder } from "discord.js";
import configuration from "../configuration.js";

class EmbedUtilities {
  public createEmbed(settings: EmbedObject): EmbedBuilder {
    const { color = "#000000", title = null, description = null, fields = [] } = settings;
    return new EmbedBuilder().setColor(color).setTitle(title).setDescription(description).addFields(fields);
  }

  public createAdvancedEmbed(settings: AdvancedEmbedObject): EmbedBuilder {
    const { color = "#000000", author = null, title = null, thumbnail = null, url = null, description = null, fields = [] } = settings;
    return new EmbedBuilder()
      .setColor(color)
      .setTitle(title)
      .setURL(url)
      .setAuthor({ name: `${author}` })
      .setThumbnail(thumbnail)
      .setDescription(description)
      .addFields(fields)
      .setFooter({
        text: `made by ${configuration.developer.userName}`,
        iconURL: configuration.developer.iconUrl
      });
  }
}
export default new EmbedUtilities();
