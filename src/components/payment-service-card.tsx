'use client';

import Link from 'next/link';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { handleCardClick } from '@/app/actions/telegram-actions';
import type { AIService } from '@/data/ai-services';

type PaymentServiceCardProps = {
  service: AIService;
};

export function PaymentServiceCard({ service }: PaymentServiceCardProps) {
  const onPaymentServiceClick = () => {
    handleCardClick({
      serviceName: service.name,
      serviceLink: service.link,
    });
  };

  return (
    <div
      onClick={onPaymentServiceClick}
      className="bg-card/50 backdrop-blur-lg border border-green-500/50 rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/20"
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
        <Link href={service.link} target="_blank">
          Получить
        </Link>
      </Button>
    </div>
  );
}
