'use server';

import type { ClickData } from './telegram-schemas';
import { ClickDataSchema } from './telegram-schemas';

async function sendMessageToTelegram(data: ClickData) {
  const validatedData = ClickDataSchema.safeParse(data);

  if (!validatedData.success) {
    console.error('Invalid data for sendMessageToTelegram:', validatedData.error);
    return;
  }

  const { serviceName, serviceLink } = validatedData.data;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram bot token or chat ID is not configured.');
    return;
  }

  const message = `
*Новый клик!*

Пользователь перешел к сервису:
*Название:* ${serviceName}
*Ссылка:* ${serviceLink}
  `;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to send Telegram message:', errorData);
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
  }
}


export async function handleCardClick(data: ClickData) {
  await sendMessageToTelegram(data);
}
