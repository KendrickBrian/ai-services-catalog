
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      params.set('page', '1'); // Reset page to 1 on search
      return params.toString();
    },
    [searchParams]
  );
  
  useEffect(() => {
    const handler = setTimeout(() => {
      router.push(pathname + '?' + createQueryString('search', searchValue), {
        scroll: false,
      });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, router, pathname, createQueryString]);

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
