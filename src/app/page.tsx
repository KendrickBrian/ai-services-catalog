import AIServiceCard from '@/components/ai-service-card';
import Controls from '@/components/controls';
import { allServices, AIService } from '@/data/ai-services';
import { Package, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { PaymentServiceCard } from '@/components/payment-service-card';
import { SearchInput } from '@/components/search-input';

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Home({ searchParams }: PageProps) {
  const category =
    typeof searchParams.category === 'string' ? searchParams.category : 'all';
  const sort =
    typeof searchParams.sort === 'string' ? searchParams.sort : 'newest';
  const search =
    typeof searchParams.search === 'string' ? searchParams.search : '';

  const paymentService = allServices.find((s) => s.isWantToPay);
  const syntxService = allServices.find((s) => s.id === 'syntx-ai-bot');

  let services = allServices.filter(
    (s) => s.id !== paymentService?.id && s.id !== syntxService?.id
  );

  if (category !== 'all') {
    services = services.filter((service) => service.category === category);
  }

  if (search) {
    services = services.filter((service) =>
      service.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  switch (sort) {
    case 'popular':
      services.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      break;
    case 'newest':
      services.sort(
        (a, b) =>
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      );
      break;
  }
  
  if (syntxService) {
    services.unshift(syntxService);
  }

  const allCategories = [
    'all',
    ...Array.from(new Set(allServices.map((s) => s.category))),
  ].filter((c) => c !== 'Специальное');

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-white">
          Бесплатные ИИ
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Лучшие нейросети 2025
        </p>
      </header>

      {paymentService && (
        <div className="mb-8">
          <PaymentServiceCard service={paymentService} />
        </div>
      )}

      <main>
        <div className="mb-8">
          <SearchInput />
        </div>
        <Controls categories={allCategories} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <AIServiceCard key={service.id} service={service} />
          ))}
        </div>
        {services.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <Package size={64} className="mb-4" />
            <h3 className="text-xl font-semibold">Ничего не найдено</h3>
            <p>Попробуйте изменить фильтры или поисковый запрос.</p>
          </div>
        )}
      </main>
    </div>
  );
}
