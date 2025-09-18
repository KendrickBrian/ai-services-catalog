
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

  // Start with all services, excluding special ones that are handled separately.
  let services = allServices.filter(
    (s) => s.id !== paymentService?.id
  );

  // Apply category filter
  if (category !== 'all') {
    services = services.filter((service) => service.category === category || service.secondaryCategory === category);
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
  switch (sort) {
    case 'popular':
      services.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      break;
    case 'newest':
    default:
      services.sort((a, b) => {
        const dateA = new Date(a.dateAdded).getTime();
        const dateB = new Date(b.dateAdded).getTime();
        if (isNaN(dateA)) return 1;
        if (isNaN(dateB)) return -1;
        return dateB - dateA;
      });
      break;
  }
  
  // Handle pinning of SYNTX service
  const syntxService = allServices.find((s) => s.id === 'syntx-ai-bot');
  if (syntxService && page === 1 && !search) {
    // Remove from current position and add to the top
    const index = services.findIndex(s => s.id === syntxService.id);
    if (index > -1) {
      services.splice(index, 1);
    }
    // Only unshift if it was in the filtered list or if we're on 'all'
    if (index > -1 || category === 'all') {
        services.unshift(syntxService);
    }
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

  return {
    paginatedServices,
    paymentService,
    totalPages,
    allCategories,
  };
}
