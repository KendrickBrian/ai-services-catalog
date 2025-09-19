'use client';

import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AIService } from '@/data/ai-services';
import React from 'react';
import { handleCardClick } from '@/app/actions/telegram-actions';

type PaymentServiceCardProps = {
  service: AIService;
};

export default function PaymentServiceCard({
  service,
}: PaymentServiceCardProps) {
    const onCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // We prevent default to handle the click ourselves,
    // ensuring the beacon is sent before navigating.
    e.preventDefault();
    
    const data = {
      serviceName: service.name,
      serviceLink: service.link,
    };

    if (typeof navigator.sendBeacon === 'function') {
      const formData = new FormData();
      formData.append('json', JSON.stringify(data));
      // Use URL relative to the origin. This is crucial for sendBeacon.
      const actionUrl = new URL(handleCardClick.name, window.location.origin).pathname;
      navigator.sendBeacon(actionUrl, formData);
    } else {
       // Fallback for older browsers
       handleCardClick(data);
    }

    // Manually navigate after sending the beacon.
    // window.open is used to respect the target="_blank" behavior.
    window.open(service.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <a
      href={service.link}
      onClick={onCardClick}
      target="_blank"
      rel="noopener noreferrer"
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
        asChild
        className="bg-green-500 hover:bg-green-600 text-white font-bold shrink-0"
      >
        <span>Получить</span>
      </Button>
    </a>
  );
}
