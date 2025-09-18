
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

  // Start with all services, excluding special ones that are handled separately.
  let filteredServices = allServices.filter(
    (s) => s.id !== paymentService?.id && s.id !== syntxService?.id
  );

  // Apply category filter
  if (category !== 'all') {
    filteredServices = filteredServices.filter((service) => service.category === category);
  }

  // Apply search filter
  if (search) {
    filteredServices = filteredServices.filter((service) =>
      service.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Apply sorting
  switch (sort) {
    case 'popular':
      filteredServices.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      break;
    case 'newest':
    default:
      filteredServices.sort((a, b) => {
        const dateA = new Date(a.dateAdded).getTime();
        const dateB = new Date(b.dateAdded).getTime();
        // Treat invalid dates as oldest by pushing them to the end
        if (isNaN(dateA)) return 1;
        if (isNaN(dateB)) return -1;
        return dateB - dateA;
      });
      break;
  }
  
  // Prepend the pinned SYNTX service if conditions are met
  if (syntxService && page === 1 && !search) {
      filteredServices.unshift(syntxService);
  }
  
  const totalServices = filteredServices.length;
  const totalPages = Math.ceil(totalServices / ITEMS_PER_PAGE);
  const paginatedServices = filteredServices.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const allCategories = [
    'all',
    ...Array.from(new Set(allServices.map((s) => s.category))),
  ].filter((c) => c !== 'Специальное');

  return {
    paginatedServices,
    paymentService,
    totalPages,
    allCategories,
  };
}
