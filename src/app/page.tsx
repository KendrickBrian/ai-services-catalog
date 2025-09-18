import AIServiceCard from '@/components/ai-service-card';
import Controls from '@/components/controls';
import { allServices, AIService } from '@/data/ai-services';
import { Package, Crown } from 'lucide-react';

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Home({ searchParams }: PageProps) {
  const category =
    typeof searchParams.category === 'string' ? searchParams.category : 'all';
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'featured';
  const search =
    typeof searchParams.search === 'string' ? searchParams.search : '';

  const featuredService = allServices.find((s) => s.isFeatured);

  let services = allServices.filter((s) => !s.isFeatured);

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
    // default 'featured' sorting is implicit
  }

  const allCategories = [
    'all',
    ...Array.from(new Set(allServices.map((s) => s.category))),
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          Бесплатные ИИ
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
          Ищем и находим САМЫЕ НОВЫЕ и ЛУЧШИЕ бесплатные нейросети, используем
          триалы и получаем бесплатный доступ.
        </p>
      </header>

      <main>
        <Controls categories={allCategories} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {featuredService &&
            (category === 'all' || category === featuredService.category) && (
              <AIServiceCard service={featuredService} />
            )}
          {services.map((service) => (
            <AIServiceCard key={service.id} service={service} />
          ))}
        </div>
        {services.length === 0 && (!featuredService || category !== featuredService.category && category !== 'all' ) && (
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
