
import React, { Suspense } from 'react';
import Controls from '@/components/controls';
import { allServices } from '@/data/ai-services';
import { Package } from 'lucide-react';
import { SearchInput } from '@/components/search-input';
import { PaginationComponent } from '@/components/pagination';
import { Skeleton } from '@/components/ui/skeleton';

const AIServiceCard = React.lazy(
  () => import('@/components/ai-service-card')
);
const PaymentServiceCard = React.lazy(
  () => import('@/components/payment-service-card')
);

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const ITEMS_PER_PAGE = 24;

export default function Home({ searchParams }: PageProps) {
  const category =
    typeof searchParams.category === 'string' ? searchParams.category : 'all';
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'newest';
  const search =
    typeof searchParams.search === 'string' ? searchParams.search : '';
  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;

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
      service.name.toLowerCase().includes((search as string).toLowerCase())
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

  if (syntxService && page === 1 && category === 'all' && !search) {
    services.unshift(syntxService);
  }
  
  const totalServices = services.length;
  const totalPages = Math.ceil(totalServices / ITEMS_PER_PAGE);
  const paginatedServices = services.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

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

      {paymentService && page === 1 && (
        <div className="mb-8">
           <Suspense fallback={<Skeleton className="h-24 w-full rounded-2xl" />}>
            <PaymentServiceCard service={paymentService} />
          </Suspense>
        </div>
      )}

      <main>
        <div className="mb-8">
          <SearchInput searchValue={search} />
        </div>
        <Controls categories={allCategories} currentCategory={category} />

        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-2xl" />
            ))}
          </div>
        }>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedServices.map((service) => (
              <AIServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Suspense>

        {paginatedServices.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <Package size={64} className="mb-4" />
            <h3 className="text-xl font-semibold">Ничего не найдено</h3>
            <p>Попробуйте изменить фильтры или поисковый запрос.</p>
          </div>
        )}
        
        {totalPages > 1 && (
          <div className="mt-8">
            <PaginationComponent currentPage={page} totalPages={totalPages} />
          </div>
        )}
      </main>
    </div>
  );
}
