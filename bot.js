import { config } from "dotenv";
import { REST, Routes } from 'discord.js';
import { Client, GatewayIntentBits} from 'discord.js';
config();
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMessages] });

const TOKEN = process.env.Token_hider
const rest = new REST({ version: '10' }).setToken(TOKEN);

client.login(TOKEN)
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
    }
  });

  client.on('messageCreate', (message) => {
    console.log(message.content);
    console.log(message.createdAt.toDateString())
    console.log(message.author.tag)
    if (message.author.bot){
        return;
    }
     if(message.content === 'hello'){
        return message.reply('guy dat your car you fit dash me...');
    }
  });