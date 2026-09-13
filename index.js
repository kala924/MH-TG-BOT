require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const path = require("path");

const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN) {
  console.error("❌ BOT_TOKEN is missing!");
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, {
  polling: true
});

bot.commands = new Map();

const commandsPath = path.join(__dirname, "commands");

if (fs.existsSync(commandsPath)) {
  for (const file of fs.readdirSync(commandsPath)) {
    if (!file.endsWith(".js")) continue;

    try {
      const command = require(path.join(commandsPath, file));

      if (command.name && typeof command.execute === "function") {
        bot.commands.set(command.name, command);
        console.log(`✅ Loaded command: ${command.name}`);
      }
    } catch (error) {
      console.error(`❌ Failed to load ${file}:`, error.message);
    }
  }
}

const eventsPath = path.join(__dirname, "events");

if (fs.existsSync(eventsPath)) {
  for (const file of fs.readdirSync(eventsPath)) {
    if (!file.endsWith(".js")) continue;

    try {
      const event = require(path.join(eventsPath, file));

      if (typeof event === "function") {
        event(bot);
        console.log(`✅ Loaded event: ${file}`);
      }
    } catch (error) {
      console.error(`❌ Failed to load event ${file}:`, error.message);
    }
  }
}

bot.on("polling_error", (error) => {
  console.error("❌ Telegram polling error:", error.message);
});

console.log("🤖 MH-TG-BOT is running!");
console.log("🌍 Multilingual AI system ready for integration.");
