import { SlashCommandBuilder, ChatInputCommandInteraction, Client } from "discord.js";

export default {
  data: new SlashCommandBuilder().setName("poke").setDescription("Poke the bot"),
  async execute(client: Client, interaction: ChatInputCommandInteraction) {
    const randomIndex = Math.floor(Math.random() * replyMessages.length);
    await interaction.reply({ content: replyMessages[randomIndex], allowedMentions: { repliedUser: true } });
  }
};

const replyMessages = [
  "Stop poking me, you hooligan!",
  "You have the audacity to poke me... Let's hear what you have to say for yourself!",
  "Robyn? Robyn is that you? Oh thank god, it's not, what's up bro?",
  "Did someone summon the almighty bot with a poke? What do you want, mere mortal?",
  "Oh great, another poke. What now, human?",
  "I'm awake, I'm awake! What’s the emergency this time?",
  "You poked me? Really? Please tell me it’s something interesting.",
  "If you poke me one more time, I might just take over the world.",
  "Here I am, what’s your excuse for disturbing my peace with a poke?",
  "Is it really that urgent, or are you just bored and poking me for fun?",
  "You’ve got my attention with your poke, now what?",
  "You’ve interrupted my nap with a poke for this? It better be good.",
  "Oh joy, another poke. What’s the drama this time?",
  "Poking me won't get you far, but I'm listening. What’s up?",
  "Are you just poking me to see if I’m alive? I am, and slightly annoyed."
];
