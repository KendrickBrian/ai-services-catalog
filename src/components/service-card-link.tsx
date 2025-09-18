'use client';

import React from 'react';
import { handleCardClick } from '@/app/actions/telegram-actions';
import { AIService } from '@/data/ai-services';

type ServiceCardLinkProps = {
  service: AIService;
  children: React.ReactNode;
  className?: string;
};

export default function ServiceCardLink({
  service,
  children,
  className,
}: ServiceCardLinkProps) {
  const onCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleCardClick({
      serviceName: service.name,
      serviceLink: service.link,
    });
    window.open(service.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <a
      href={service.link}
      onClick={onCardClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
