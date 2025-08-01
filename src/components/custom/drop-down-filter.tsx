/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from '../ui/button';
import { Filter } from 'lucide-react';
import { Table } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface DropDownFilter {
  table: Table<any>;
  title: string;
  selections: Record<string, string>;
  column: string;
}

const DropDownFilter = ({
  table,
  title,
  selections,
  column,
}: DropDownFilter) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-gray-500">
          <Filter />
          {title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup
          value={
            table.getColumn(column)?.getFilterValue() as string | undefined
          }
          onValueChange={(value) => {
            table
              .getColumn(column)
              ?.setFilterValue(value === 'all' ? undefined : value);
          }}
        >
          <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
          <DropdownMenuSeparator />
          {Object.entries(selections).map(([value, label]) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownFilter;
