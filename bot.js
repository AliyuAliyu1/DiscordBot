import { config } from "dotenv";
import { Client, GatewayIntentBits, Routes } from "discord.js";
import { REST } from "@discordjs/rest";
// starting the config for hiding the Token
config();

//  creating a variable holder for the token imported from the .env file
const TOKEN = process.env.Token_hider;

// creating a variable holders for the Slash command imported from the .env file
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
// creating a client object and also a message content holder to hold the messages
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

// starting the Rest to interact with the api using the token

const rest = new REST({ version: "10" }).setToken(TOKEN);
// listens for any user input
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
const jokes = [
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "I used to play piano by ear, but now I use my hands.",
  "Parallel lines have so much in common. It's a shame they'll never meet.",
  "Why don't scientists trust atoms? Because they make up everything!",
  "What do you call a bear with no teeth? A gummy bear!",
  "Why did the bicycle fall over? Because it was two-tired!",
  "Did you hear about the kidnapping at the playground? They woke up.",
  "What do you call cheese that isn't yours? Nacho cheese!",
  "How do you organize a space party? You planet!",
  "I'm reading a book on anti-gravity. It's impossible to put down!",
  "Why don't skeletons fight each other? They don't have the guts.",
  "What did one wall say to the other wall? I'll meet you at the corner!",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "How do you make a tissue dance? You put a little boogie in it!",
  "What do you get when you cross a snowman and a dog? Frostbite!",
  "Why did the math book look sad? Because it had too many problems.",
  "I'm on a seafood diet. I see food, and I eat it.",
  "Did you hear about the fire at the circus? It was in tents!",
  "What do you call a fish with no eyes? Fsh!",
  "How do you organize a space party? You planet!",
  "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
  "How does a penguin build its house? Igloos it together!",
  "What do you call a can opener that doesn't work? A can't opener!",
  "Why did the tomato turn red? Because it saw the salad dressing!",
  "What do you get when you cross a vampire and a snowman? Frostbite!",
  "I used to be a baker, but I couldn't make enough dough.",
  "I'm reading a book on anti-gravity. It's impossible to put down!",
  "Did you hear about the cheese factory explosion? There was nothing left but de-brie.",
  "How do you organize a space party? You planet!",
  "Why did the bicycle fall over? Because it was two-tired!",
  "What do you call a bear with no teeth? A gummy bear!",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "Why don't skeletons fight each other? They don't have the guts.",
  "What did one wall say to the other wall? I'll meet you at the corner!",
  "I'm on a seafood diet. I see food, and I eat it.",
  "Did you hear about the fire at the circus? It was in tents!",
  "What do you call a fish with no eyes? Fsh!",
  "How do you organize a space party? You planet!",
  "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
  "How does a penguin build its house? Igloos it together!",
  "What do you call a can opener that doesn't work? A can't opener!",
  "Why did the tomato turn red? Because it saw the salad dressing!",
  "What do you get when you cross a vampire and a snowman? Frostbite!",
  "I used to be a baker, but I couldn't make enough dough.",
  "I'm reading a book on anti-gravity. It's impossible to put down!",
  "Did you hear about the cheese factory explosion? There was nothing left but de-brie.",
  "How do you organize a space party? You planet!",
  "Why did the bicycle fall over? Because it was two-tired!",
  "What do you call a bear with no teeth? A gummy bear!",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",

  // Add more jokes here...
];

function getRandomJoke() {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  return jokes[randomIndex];
}


client.on('interactionCreate',  async interaction => {
  if (interaction.isChatInputCommand()) {
     return interaction.reply(getRandomJoke());
  }
  

});

// once a message has been logged in it will take the message and reply with a certain messsage
client.on("messageCreate", (message) => {
  console.log(message.content);
  console.log(message.createdAt.toDateString());
  console.log(message.author.tag);
  if (message.author.bot) {
    return;
  }
  if (message.content === "hello") {
    return message.reply("guy dat your car you fit dash me...");
  }
});

//  creating the default log in slash object
async function main() {
  const commands = [
    {
      name: "jokes",
      description: "produces random jokes",
    },

  ];
  try {
    console.log("started refreshing application (/) command.");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
    client.login(TOKEN);
  } catch (err) {
    console.log(err);
  }
}
main();
