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

  let services = allServices.filter(
    (service) => !service.isWantToPay
  );

  // Apply category filter
  if (category !== 'all') {
    services = services.filter((service) => 
      service.category === category || service.secondaryCategory === category
    );
  }

  // Apply search filter
  if (search) {
    const lowercasedSearch = search.toLowerCase();
    services = services.filter((service) =>
      service.name.toLowerCase().includes(lowercasedSearch) ||
      service.description.toLowerCase().includes(lowercasedSearch)
    );
  }

  // Apply sorting
  services.sort((a, b) => {
    // Pinning logic for SYNTX
    const pinCategories = ['all', 'Текст', 'Изображения', 'Видео'];
    const shouldPin = page === 1 && !search && pinCategories.includes(category);

    if (shouldPin) {
      if (a.id === 'syntx-ai-bot' && b.id !== 'syntx-ai-bot') return -1;
      if (a.id !== 'syntx-ai-bot' && b.id === 'syntx-ai-bot') return 1;
    }

    // Default sorting logic
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
