'use client';

import { Star, Flame, CheckCircle, Users } from 'lucide-react';
import { AIService } from '@/data/ai-services';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import React from 'react';
import type { ClickData } from '@/app/actions/telegram-schemas';

type AIServiceCardProps = {
  service: AIService;
};

const iconMap: { [key: string]: React.ReactNode } = {
  Текст: (
    <span role="img" aria-label="text">
      📝
    </span>
  ),
  Изображения: (
    <span role="img" aria-label="images">
      🖼️
    </span>
  ),
  Код: (
    <span role="img" aria-label="code">
      💻
    </span>
  ),
  Видео: (
    <span role="img" aria-label="video">
      🎬
    </span>
  ),
  Аудио: (
    <span role="img" aria-label="audio">
      🎵
    </span>
  ),
  Маркетинг: (
    <span role="img" aria-label="marketing">
      📈
    </span>
  ),
  Дизайн: (
    <span role="img" aria-label="design">
      🎨
    </span>
  ),
  Продуктивность: (
    <span role="img" aria-label="productivity">
      ⚡️
    </span>
  ),
  Автоматизация: (
    <span role="img" aria-label="automation">
      🤖
    </span>
  ),
  'Бизнес и финансы': (
    <span role="img" aria-label="business">
      💼
    </span>
  ),
  Образование: (
    <span role="img" aria-label="education">
      🎓
    </span>
  ),
  Здоровье: (
    <span role="img" aria-label="health">
      ❤️‍🩹
    </span>
  ),
  '3D и моделирование': (
    <span role="img" aria-label="3d">
      🧊
    </span>
  ),
  Разное: (
    <span role="img" aria-label="other">
      📦
    </span>
  ),
};

const getTags = (service: AIService) => {
  const tags = [];
  if (service.tags) {
    if (service.tags.includes('Бесплатно')) {
      tags.push(
        <div
          key="free"
          className="flex items-center gap-1 text-green-400 text-xs"
        >
          <CheckCircle className="w-3 h-3" />
          Бесплатно
        </div>
      );
    }
    if (service.tags.includes('Есть триал')) {
      tags.push(
        <div
          key="trial"
          className="flex items-center gap-1 text-blue-400 text-xs"
        >
          <Flame className="w-3 h-3" />
          Есть триал
        </div>
      );
    }
  }
  return tags;
};

export default function AIServiceCard({ service }: AIServiceCardProps) {
  const trackClick = async (clickData: ClickData) => {
    try {
      await fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clickData),
      });
    } catch (error) {
      console.error('Error in trackClick:', error);
    }
  };

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    await trackClick({
      serviceName: service.name,
      serviceLink: service.link,
    });

    try {
      // @ts-ignore
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.openLink(service.link);
      } else {
        window.open(service.link, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('Error opening link, falling back to window.open:', error);
      window.open(service.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <a
      href={service.link}
      onClick={handleClick}
      className={cn(
        'group relative w-full bg-card/50 backdrop-blur-lg border border-white/10 rounded-2xl p-4 flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer no-underline text-current'
      )}
    >
      <div className="relative z-10 flex flex-col h-full">
        {service.isFeatured && (
          <div className="absolute -top-3 left-4 z-10">
            <Badge
              variant="default"
              className="bg-amber-400 text-black border-none text-xs font-bold"
            >
              <Star className="w-3 h-3 mr-1" />
              ТОП
            </Badge>
          </div>
        )}

        <div className="flex justify-between items-start mb-3 pt-2">
          <h3 className="font-headline text-lg font-bold text-white truncate pr-4">
            {service.name}
          </h3>
          {service.rating && (
            <div className="flex items-center gap-1 text-sm font-bold text-amber-400 shrink-0">
              <Star className="w-4 h-4 fill-current" />
              <span>{service.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-3">
          {service.category in iconMap && iconMap[service.category]}
          <span className="text-xs text-muted-foreground">
            {service.category}
          </span>
          {service.secondaryCategory && (
            <>
              <span className="text-xs text-muted-foreground">•</span>
              {service.secondaryCategory in iconMap && iconMap[service.secondaryCategory]}
              <span className="text-xs text-muted-foreground">
                {service.secondaryCategory}
              </span>
            </>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-4 flex-grow min-h-[40px]">
          {service.description}
        </p>

        <div className="flex items-center gap-3 mb-4">{getTags(service)}</div>

        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <Users className="w-4 h-4" />
            <span>{service.popularity}K</span>
          </div>
          <Button
            asChild={false}
            size="sm"
            className="bg-primary/20 hover:bg-primary/40 border border-primary/50 text-white rounded-lg z-20 relative"
          >
            <span>Попробовать</span>
          </Button>
        </div>
      </div>
    </a>
  );
}
