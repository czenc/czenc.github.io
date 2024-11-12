const { Client, GatewayIntentBits } = require('discord.js');

// Your bot token
const TOKEN = 'MTMwNTk1NDMwMzMxNTQxMDk5NQ.G2wIUs.OjhHp4WLR68CPLrX6pUpKTm9w8x_9psP_jlpzM';

// The target user ID to send a message to
const TARGET_USER_ID = '984878152562130974';  // Replace with the target user ID

// Create a new client instance with required intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,               // Allows the bot to interact with servers (guilds)
    GatewayIntentBits.GuildMessages,        // Allows the bot to read messages in guilds
    GatewayIntentBits.MessageContent        // Allows the bot to read the message content
  ]
});

// When the bot is ready
client.once('ready', () => {
  console.log(`Bot is online as ${client.user.tag}`);
});

// Listen for messages in the server
client.on('messageCreate', async (message) => {
  // Ignore messages from the bot itself
  if (message.author.bot) return;

  // Check if the user typed ".send" and has admin privileges
  if (message.content.toLowerCase() === '.send') {
    // Check if the sender has admin privileges
    if (message.member && message.member.permissions.has('ADMINISTRATOR')) {
      // Fetch the target user and send them the message
      try {
        const targetUser = await client.users.fetch(TARGET_USER_ID);
        await targetUser.send('Hi');
        console.log(`Message sent to ${TARGET_USER_ID}`);
      } catch (error) {
        console.error('Error sending message to target user:', error);
      }
    } else {
      // If the sender doesn't have admin privileges
      message.reply("You need admin privileges to use this command.");
    }
  }
});

// Log in to Discord with your app's token
client.login(TOKEN);
