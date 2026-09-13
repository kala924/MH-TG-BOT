const fs = require("fs");
const path = require("path");

const usersFile = path.join(
  __dirname,
  "..",
  "database",
  "users.json"
);

function loadUsers() {
  try {
    if (!fs.existsSync(usersFile)) {
      return {};
    }

    return JSON.parse(fs.readFileSync(usersFile, "utf8"));
  } catch {
    return {};
  }
}

function saveUsers(users) {
  fs.writeFileSync(
    usersFile,
    JSON.stringify(users, null, 2)
  );
}

module.exports = function (bot) {
  bot.on("callback_query", async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    try {
      if (data === "help") {
        await bot.answerCallbackQuery(query.id);

        await bot.sendMessage(
          chatId,
          "❓ Use /help to see all available commands."
        );

        return;
      }

      if (data === "about") {
        await bot.answerCallbackQuery(query.id);

        await bot.sendMessage(
          chatId,
          "🤖 MH-TG-BOT\n\n🌍 Multilingual AI Assistant\n👨‍💻 MH-BOT TEAM"
        );

        return;
      }

      if (data === "language") {
        await bot.answerCallbackQuery(query.id);

        await bot.sendMessage(
          chatId,
          "🌐 Choose your language:",
          {
            reply_markup: {
              inline_keyboard: [
                [
                  { text: "🇧🇩 বাংলা", callback_data: "lang_bn" },
                  { text: "🇬🇧 English", callback_data: "lang_en" }
                ],
                [
                  { text: "🇮🇳 हिन्दी", callback_data: "lang_hi" },
                  { text: "🇸🇦 العربية", callback_data: "lang_ar" }
                ],
                [
                  { text: "🇨🇳 中文", callback_data: "lang_zh" },
                  { text: "🇯🇵 日本語", callback_data: "lang_ja" }
                ],
                [
                  { text: "🇰🇷 한국어", callback_data: "lang_ko" }
                ]
              ]
            }
          }
        );

        return;
      }

      if (data.startsWith("lang_")) {
        const language = data.replace("lang_", "");

        const languageNames = {
          bn: "🇧🇩 বাংলা",
          en: "🇬🇧 English",
          hi: "🇮🇳 हिन्दी",
          ar: "🇸🇦 العربية",
          zh: "🇨🇳 中文",
          ja: "🇯🇵 日本語",
          ko: "🇰🇷 한국어"
        };

        const users = loadUsers();

        const userId = String(query.from.id);

        users[userId] = {
          ...(users[userId] || {}),
          language
        };

        saveUsers(users);

        await bot.answerCallbackQuery(query.id, {
          text: "✅ Language saved!"
        });

        await bot.sendMessage(
          chatId,
          `✅ Language selected: ${languageNames[language]}

🌐 Your language preference has been saved.`
        );
      }
    } catch (error) {
      console.error("❌ Callback error:", error.message);

      try {
        await bot.answerCallbackQuery(query.id);
      } catch {}
    }
  });
};
