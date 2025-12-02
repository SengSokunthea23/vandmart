"use server";

import TelegramBot from "node-telegram-bot-api";

export const sendTelegramMessage = async (message: string) => {
  try {
    const bot = new TelegramBot(process.env.TELEGRAM_TOKEN!, {
      polling: false,
    });

    await bot.sendMessage(process.env.TELEGRAM_CHAT_ID!, message, {
      parse_mode: "Markdown",
    });

    return {
      success: true,
      message: "Message sent successfully",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to send message",
    };
  }
};
