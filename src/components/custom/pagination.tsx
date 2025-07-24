import { Button } from '@/components/ui/button';
import { Table } from '@tanstack/react-table';
import React from 'react';

export default function PaginationPanel<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  const currentPage = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  const visiblePages = new Set<number>();

  visiblePages.add(0);
  visiblePages.add(pageCount - 1);
  visiblePages.add(currentPage);
  if (currentPage - 1 > 0) visiblePages.add(currentPage - 1);
  if (currentPage + 1 < pageCount - 1) visiblePages.add(currentPage + 1);

  const sortedPages = Array.from(visiblePages).sort((a, b) => a - b);

  return (
    <div>
      {sortedPages.map((pageIndex, i) => (
        <React.Fragment key={`fragment-${pageIndex}`}>
          {i > 0 && sortedPages[i - 1] !== pageIndex - 1 && (
            <span key={`ellipsis-${pageIndex}`} className="px-2">
              ...
            </span>
          )}
          <Button
            key={pageIndex}
            variant={pageIndex === currentPage ? 'default' : 'outline'}
            onClick={() => table.setPageIndex(pageIndex)}
            className={`w-10 h-10 ${
              pageIndex === currentPage
                ? 'bg-black text-white'
                : 'bg-white text-black'
            } m-1`}
          >
            {pageIndex + 1}
          </Button>
        </React.Fragment>
      ))}
    </div>
  );
}
