module.exports = {
  name: "language",

  async execute(bot, msg) {
    await bot.sendMessage(
      msg.chat.id,
      "🌐 Choose your language:",
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🇧🇩 বাংলা",
                callback_data: "lang_bn"
              },
              {
                text: "🇬🇧 English",
                callback_data: "lang_en"
              }
            ],
            [
              {
                text: "🇮🇳 हिन्दी",
                callback_data: "lang_hi"
              },
              {
                text: "🇸🇦 العربية",
                callback_data: "lang_ar"
              }
            ],
            [
              {
                text: "🇨🇳 中文",
                callback_data: "lang_zh"
              },
              {
                text: "🇯🇵 日本語",
                callback_data: "lang_ja"
              }
            ],
            [
              {
                text: "🇰🇷 한국어",
                callback_data: "lang_ko"
              }
            ]
          ]
        }
      }
    );
  }
};
