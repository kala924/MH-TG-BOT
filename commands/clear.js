module.exports = {
  name: "clear",

  async execute(bot, msg) {
    await bot.sendMessage(
      msg.chat.id,
      "🧹 Your conversation context has been cleared."
    );
  }
};
