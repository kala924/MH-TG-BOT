module.exports = {
  name: "start",

  async execute(bot, msg) {
    const chatId = msg.chat.id;
    const firstName = msg.from?.first_name || "there";

    await bot.sendMessage(
      chatId,
      `👋 Hello ${firstName}!

🤖 Welcome to MH-TG-BOT.

🌍 Multilingual AI Assistant

💬 Talk with me naturally.
🧠 AI conversation is coming next.
🌐 Choose your preferred language below.`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🌐 Language",
                callback_data: "language"
              },
              {
                text: "❓ Help",
                callback_data: "help"
              }
            ],
            [
              {
                text: "ℹ️ About",
                callback_data: "about"
              }
            ]
          ]
        }
      }
    );
  }
};
