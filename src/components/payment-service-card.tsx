'use client';

import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AIService } from '@/data/ai-services';
import React from 'react';
import type { ClickData } from '@/app/actions/telegram-schemas';
import { useTelegramUser } from '@/app/telegram-user-provider';

type PaymentServiceCardProps = {
  service: AIService;
};

export default function PaymentServiceCard({
  service,
}: PaymentServiceCardProps) {
  const user = useTelegramUser();

 const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // 1. Track the click
    try {
      if (navigator.sendBeacon) {
        let clickData: ClickData = {
          serviceName: service.name,
          serviceLink: service.link,
        };

        if (user) {
           clickData = {
            ...clickData,
            userId: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
          };
        }

        const blob = new Blob([JSON.stringify(clickData)], { type: 'application/json' });
        navigator.sendBeacon('/api/track', blob);
      }
    } catch (error) {
       console.error('Error in handleAnalytics:', error);
    }
    
    // 2. Open the link using Telegram's method
     try {
      // @ts-ignore
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.openLink(service.link);
      } else {
        // Fallback for non-Telegram environments
        window.open(service.link, '_blank', 'noopener,noreferrer');
      }
    } catch(error) {
        console.error('Error opening link:', error);
        // Fallback for any other error
        window.open(service.link, '_blank', 'noopener,noreferrer');
    }
  };


  return (
    <a
      href={service.link}
      onClick={handleClick}
      className="bg-card/50 backdrop-blur-lg border border-green-500/50 rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/20 no-underline text-current"
    >
      <div className="flex items-center gap-4">
        <div className="bg-green-500/20 p-3 rounded-lg">
          <CreditCard className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <h3 className="font-bold text-white">{service.name}</h3>
          <p className="text-sm text-muted-foreground">{service.description}</p>
        </div>
      </div>
      <Button
        asChild={false}
        className="bg-green-500 hover:bg-green-600 text-white font-bold shrink-0"
      >
        <span>Получить</span>
      </Button>
    </a>
  );
}
