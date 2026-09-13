module.exports = {
  name: "help",

  async execute(bot, msg) {
    await bot.sendMessage(
      msg.chat.id,
      `📚 MH-TG-BOT

/start - Start the bot
/help - Show help
/language - Change language
/clear - Clear conversation
/about - About the bot

💬 Send a normal message to chat with the AI.`
    );
  }
};
