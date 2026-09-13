module.exports = function (bot) {
  bot.on("message", async (msg) => {
    if (!msg.text) return;

    if (msg.text.startsWith("/")) return;

    try {
      await bot.sendChatAction(msg.chat.id, "typing");

      await bot.sendMessage(
        msg.chat.id,
        "🤖 AI conversation system is being connected..."
      );
    } catch (error) {
      console.error("❌ Message event error:", error.message);
    }
  });
};
