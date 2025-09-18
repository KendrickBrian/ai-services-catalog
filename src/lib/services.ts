
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

  // Start with all services, excluding the special payment service.
  let services = allServices.filter(
    (s) => s.id !== paymentService?.id
  );

  // 1. Apply category filter
  if (category !== 'all') {
    services = services.filter((service) => service.category === category || service.secondaryCategory === category);
  }

  // 2. Apply search filter
  if (search) {
    const lowercasedSearch = search.toLowerCase();
    services = services.filter((service) =>
      service.name.toLowerCase().includes(lowercasedSearch) ||
      service.description.toLowerCase().includes(lowercasedSearch)
    );
  }

  // 3. Apply sorting
  switch (sort) {
    case 'popular':
      services.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      break;
    case 'newest':
    default:
      services.sort((a, b) => {
        const dateA = new Date(a.dateAdded).getTime();
        const dateB = new Date(b.dateAdded).getTime();
        // Handle invalid dates gracefully
        if (isNaN(dateA)) return 1;
        if (isNaN(dateB)) return -1;
        return dateB - dateA;
      });
      break;
  }
  
  // 4. Safely handle pinning for SYNTX service
  const categoriesToPinIn = ['Текст', 'Изображения', 'Видео'];
  if (page === 1 && !search && categoriesToPinIn.includes(category)) {
    const syntxService = services.find((s) => s.id === 'syntx-ai-bot');
    if (syntxService) {
        // Find item and remove it from its current position
        const index = services.findIndex(s => s.id === syntxService.id);
        if (index > -1) {
            services.splice(index, 1);
            // Add it to the beginning
            services.unshift(syntxService);
        }
    }
  }
  
  // 5. Paginate the final list
  const totalServices = services.length;
  const totalPages = Math.ceil(totalServices / ITEMS_PER_PAGE);
  const paginatedServices = services.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const allCategories = [
    'all',
    ...Array.from(new Set(allServices.flatMap((s) => [s.category, s.secondaryCategory]).filter(Boolean) as string[])),
  ].filter((c) => c !== 'Специальное');

  return {
    paginatedServices,
    paymentService,
    totalPages,
    allCategories,
  };
}
