import AIServiceCard from '@/components/ai-service-card';
import Controls from '@/components/controls';
import { allServices, AIService } from '@/data/ai-services';
import { Package, Crown, CreditCard, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Home({ searchParams }: PageProps) {
  const category =
    typeof searchParams.category === 'string' ? searchParams.category : 'all';
  const sort =
    typeof searchParams.sort === 'string' ? searchParams.sort : 'newest'; // Changed default to 'newest' as 'featured' isn't in the new design
  const search =
    typeof searchParams.search === 'string' ? searchParams.search : '';

  const paymentService = allServices.find((s) => s.isWantToPay);

  let services = allServices.filter(
    (s) => s.id !== paymentService?.id
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
    // 'featured' sort is removed
  }

  const allCategories = [
    'all',
    ...Array.from(new Set(allServices.map((s) => s.category))),
  ].filter(c => c !== 'Специальное');

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-white">
            Бесплатные ИИ
          </h1>
          <p className="text-sm text-muted-foreground">
            Лучшие нейросети 2024
          </p>
        </div>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5 text-muted-foreground" />
        </Button>
      </header>

      {paymentService && (
        <div className="mb-8">
          <div className="bg-card/50 backdrop-blur-lg border border-green-500/50 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-green-500/20 p-3 rounded-lg">
                <CreditCard className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">
                  {paymentService.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {paymentService.description}
                </p>
              </div>
            </div>
            <Button asChild className="bg-green-500 hover:bg-green-600 text-white font-bold shrink-0">
              <Link href={paymentService.link} target="_blank">Получить</Link>
            </Button>
          </div>
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