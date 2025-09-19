'use client';

import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AIService } from '@/data/ai-services';
import React from 'react';

type PaymentServiceCardProps = {
  service: AIService;
};

export default function PaymentServiceCard({
  service,
}: PaymentServiceCardProps) {
    const handleAnalytics = () => {
    if (navigator.sendBeacon) {
      const data = {
        serviceName: service.name,
        serviceLink: service.link,
      };
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      navigator.sendBeacon('/api/track', blob);
    }
  };


  return (
    <a
      href={service.link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleAnalytics}
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
        asChild={false} // Ensure it's a button
        className="bg-green-500 hover:bg-green-600 text-white font-bold shrink-0"
        onClick={(e) => {
           // This button is inside the `a` tag, so we don't need a separate click handler for navigation.
           // The analytics handler is already on the parent `a` tag.
           // We just let the default click behavior happen.
        }}
      >
        <span>Получить</span>
      </Button>
    </a>
  );
}
