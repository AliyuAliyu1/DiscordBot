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
