'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the shape of the Telegram user object
interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
}

// Define the shape of the context data
interface TelegramUserContextType {
  id?: number;
  firstName?: string;
  lastName?: string;
  username?: string;
}

// Create the context
const TelegramUserContext = createContext<TelegramUserContextType | null>(null);

// Create a provider component
export const TelegramUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TelegramUserContextType | null>(null);

  useEffect(() => {
    // This effect runs only once on the client-side after hydration
    try {
      // @ts-ignore
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.ready(); // Ensure the Web App is ready
        if (tg.initDataUnsafe?.user) {
          const tgUser = tg.initDataUnsafe.user;
          setUser({
            id: tgUser.id,
            firstName: tgUser.first_name,
            lastName: tgUser.last_name,
            username: tgUser.username,
          });
        }
      }
    } catch (error) {
      console.error("Failed to initialize Telegram Web App user:", error);
    }
  }, []);

  return (
    <TelegramUserContext.Provider value={user}>
      {children}
    </TelegramUserContext.Provider>
  );
};

// Create a custom hook to use the context
export const useTelegramUser = () => {
  return useContext(TelegramUserContext);
};
