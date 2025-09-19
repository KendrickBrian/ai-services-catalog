
import React, { Suspense } from 'react';
import Controls from '@/components/controls';
import { Package } from 'lucide-react';
import { SearchInput } from '@/components/search-input';
import { PaginationComponent } from '@/components/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import AIServiceCard from '@/components/ai-service-card';
import PaymentServiceCard from '@/components/payment-service-card';
import { getServices } from '@/lib/services';

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: PageProps) {
  const category =
    typeof searchParams.category === 'string' ? searchParams.category : 'all';
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'newest';
  const search =
    typeof searchParams.search === 'string' ? searchParams.search : '';
  const page =
    typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;

  const {
    paginatedServices,
    paymentService,
    totalPages,
    allCategories,
  } = getServices({ category, sort, search, page });

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

      {paymentService && page === 1 && !search && (
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
