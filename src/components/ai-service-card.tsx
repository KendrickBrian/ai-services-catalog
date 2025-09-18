import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowUpRight, Crown, CreditCard } from 'lucide-react';

import { AIService } from '@/data/ai-services';
import AIServiceSummary from './ai-service-summary';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Skeleton } from './ui/skeleton';

type AIServiceCardProps = {
  service: AIService;
};

export default function AIServiceCard({ service }: AIServiceCardProps) {
  const placeholder = PlaceHolderImages.find((p) => p.id === service.image);

  if (service.isWantToPay) {
    return (
      <Link
        href={service.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block"
      >
        <div className="relative w-full h-[420px] bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl overflow-hidden p-6 flex flex-col justify-between transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/30">
          <div>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary" className="bg-white/20 text-white">
                {service.category}
              </Badge>
              <CreditCard className="w-8 h-8 text-white/80" />
            </div>
            <h3 className="font-headline text-3xl font-bold text-white">
              {service.name}
            </h3>
          </div>
          <div className="text-white/90">
            <p className="font-light text-lg">{service.description}</p>
          </div>
          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="w-8 h-8 text-white" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="group relative w-full h-[420px] bg-card/50 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden p-4 flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
      {service.isFeatured && (
        <div className="absolute top-2 right-2 z-10">
          <Badge
            variant="default"
            className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-none"
          >
            <Crown className="w-3 h-3 mr-1" />
            Топ
          </Badge>
        </div>
      )}
      <div className="relative w-full h-[160px] rounded-lg overflow-hidden mb-3">
        {placeholder && (
          <Image
            src={placeholder.imageUrl}
            alt={service.name}
            width={320}
            height={200}
            data-ai-hint={placeholder.imageHint}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="font-headline text-xl font-bold truncate mb-1">
          {service.name}
        </h3>
        <div className="flex-grow text-sm text-muted-foreground mb-3">
          <Suspense
            fallback={<Skeleton className="h-10 w-full rounded-md" />}
          >
            <AIServiceSummary description={service.description} />
          </Suspense>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {service.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Button asChild size="sm" className="w-full mt-auto">
        <Link href={service.link} target="_blank" rel="noopener noreferrer">
          Попробовать <ArrowUpRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
