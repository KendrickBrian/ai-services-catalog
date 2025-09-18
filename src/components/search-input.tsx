
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type SearchInputProps = {
  searchValue: string;
};

export function SearchInput({ searchValue: initialSearchValue }: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState(initialSearchValue);

  // Update state if the initial prop changes (e.g., from browser back/forward)
  useEffect(() => {
    setSearchValue(initialSearchValue);
  }, [initialSearchValue]);

  const handleSearch = useCallback((value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    router.push(pathname + '?' + params.toString(), {
      scroll: false,
    });
  }, [pathname, router]);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      // Only trigger search if value has actually changed
      if (searchValue !== initialSearchValue) {
        handleSearch(searchValue);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, initialSearchValue, handleSearch]);

  return (
    <div className="relative">
      <label htmlFor="search-input" className="text-sm font-medium text-muted-foreground mb-2 block">Поиск</label>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform mt-3 h-5 w-5 text-muted-foreground" />
      <Input
        id="search-input"
        type="search"
        placeholder="Найти нейросеть..."
        className="w-full pl-10 bg-card/50"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}
