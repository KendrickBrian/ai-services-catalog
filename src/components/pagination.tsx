
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { useCallback } from 'react';

type PaginationComponentProps = {
  currentPage: number;
  totalPages: number;
};

export function PaginationComponent({ currentPage, totalPages }: PaginationComponentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(pathname + '?' + createQueryString('page', String(page)), {
        scroll: true,
      });
    }
  };

  const getPaginationItems = () => {
    const items = [];
    const pageNumbers = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) {
        pageNumbers.push(-1); // ellipsis
      }
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        start = 2;
        end = 4;
      }
      
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages -1;
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(-1); // ellipsis
      }
      pageNumbers.push(totalPages);
    }
    
    for (const pageNum of pageNumbers) {
      if (pageNum === -1) {
        items.push(<PaginationItem key={`ellipsis-${items.length}`}><PaginationEllipsis /></PaginationItem>);
      } else {
        items.push(
          <PaginationItem key={pageNum}>
            <PaginationLink
              href="#"
              isActive={currentPage === pageNum}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(pageNum);
              }}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return items;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
            className={cn({ 'pointer-events-none opacity-50': currentPage === 1 })}
          />
        </PaginationItem>
        {getPaginationItems()}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
             className={cn({ 'pointer-events-none opacity-50': currentPage === totalPages })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
