const fs = require("fs");
const path = require("path");

const usersFile = path.join(
  __dirname,
  "..",
  "database",
  "users.json"
);

module.exports = {
  name: "clear",

  async execute(bot, msg) {
    try {
      let users = {};

      if (fs.existsSync(usersFile)) {
        users = JSON.parse(
          fs.readFileSync(usersFile, "utf8")
        );
      }

      const userId = String(msg.from.id);

      users[userId] = {
        ...(users[userId] || {}),
        conversation: []
      };

      fs.writeFileSync(
        usersFile,
        JSON.stringify(users, null, 2)
      );

      await bot.sendMessage(
        msg.chat.id,
        "🧹 Conversation memory cleared successfully!"
      );

    } catch (error) {
      console.error("❌ Clear error:", error.message);

      await bot.sendMessage(
        msg.chat.id,
        "❌ Couldn't clear the conversation memory."
      );
    }
  }
};
