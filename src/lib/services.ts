
import { allServices, AIService } from '@/data/ai-services';

const ITEMS_PER_PAGE = 24;

type GetServicesParams = {
  category: string;
  sort: string;
  search: string;
  page: number;
};

export function getServices({ category, sort, search, page }: GetServicesParams) {
  const paymentService = allServices.find((s) => s.isWantToPay);
  const syntxService = allServices.find((s) => s.id === 'syntx-ai-bot');

  let services = allServices.filter(
    (service) => !service.isWantToPay && service.id !== 'syntx-ai-bot'
  );

  // Apply search filter first
  if (search) {
    const lowercasedSearch = search.toLowerCase();
    services = services.filter((service) =>
      service.name.toLowerCase().includes(lowercasedSearch) ||
      service.description.toLowerCase().includes(lowercasedSearch)
    );
  }

  // Apply category filter
  if (category !== 'all') {
    services = services.filter((service) => 
      service.category === category || service.secondaryCategory === category
    );
  }

  // Apply sorting
  services.sort((a, b) => {
    if (sort === 'popular') {
      return (b.popularity || 0) - (a.popularity || 0);
    }
    
    // Default to newest
    const dateA = new Date(a.dateAdded).getTime();
    const dateB = new Date(b.dateAdded).getTime();
    if (isNaN(dateA)) return 1;
    if (isNaN(dateB)) return -1;
    return dateB - dateA;
  });

  // Pin SYNTX to the top for specific categories on the first page without search
  const pinCategories = ['all', 'Изображения', 'Видео', 'Аудио', 'Текст'];
  if (syntxService && page === 1 && !search && pinCategories.includes(category)) {
      services.unshift(syntxService);
  }
  
  // Paginate the final list
  const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE);
  const paginatedServices = services.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const allCategories = [
    'all',
    ...Array.from(new Set(allServices.flatMap((s) => [s.category, s.secondaryCategory]).filter((c): c is string => !!c))),
  ].filter((c) => c !== 'Специальное');

  return {
    paginatedServices,
    paymentService,
    totalPages,
    allCategories,
  };
}
