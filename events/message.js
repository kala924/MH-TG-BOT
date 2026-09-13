const chatWithAI = require("../ai/chat");
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
    if (!fs.existsSync(usersFile)) return {};

    return JSON.parse(
      fs.readFileSync(usersFile, "utf8")
    );
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
  bot.on("message", async (msg) => {
    if (!msg.text) return;
    if (msg.text.startsWith("/")) return;

    const chatId = msg.chat.id;
    const userId = String(msg.from.id);

    try {
      await bot.sendChatAction(chatId, "typing");

      const users = loadUsers();

      if (!users[userId]) {
        users[userId] = {
          language: "auto",
          conversation: []
        };
      }

      const user = users[userId];

      const reply = await chatWithAI(msg.text, {
        userId,
        language: user.language,
        conversation: user.conversation
      });

      user.conversation.push({
        role: "user",
        content: msg.text
      });

      user.conversation.push({
        role: "assistant",
        content: reply
      });

      // Keep only the latest 20 messages
      if (user.conversation.length > 20) {
        user.conversation =
          user.conversation.slice(-20);
      }

      saveUsers(users);

      await bot.sendMessage(chatId, reply);

    } catch (error) {
      console.error("❌ AI Error:", error.message);

      await bot.sendMessage(
        chatId,
        "❌ Sorry, something went wrong while generating the AI response."
      );
    }
  });
};
