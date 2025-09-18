import AIServiceCard from '@/components/ai-service-card';
import Controls from '@/components/controls';
import { allServices, AIService } from '@/data/ai-services';
import { Package, CreditCard, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PaymentServiceCard } from '@/components/payment-service-card';

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

  let services = allServices.filter((s) => s.id !== paymentService?.id);

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

  const allCategories = [
    'all',
    ...Array.from(new Set(allServices.map((s) => s.category))),
  ].filter((c) => c !== 'Специальное');

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-white">
            Бесплатные ИИ
          </h1>
          <p className="text-sm text-muted-foreground">Лучшие нейросети 2025</p>
        </div>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5 text-muted-foreground" />
        </Button>
      </header>

      {paymentService && (
        <div className="mb-8">
          <PaymentServiceCard service={paymentService} />
        </div>
      )}

      <main>
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
