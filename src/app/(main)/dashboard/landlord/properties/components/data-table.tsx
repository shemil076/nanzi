'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Property } from '@/types/property';
import { getColumnsForProperties } from './columns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PaginationPanel from '../../../../../../components/custom/pagination';
import { useState } from 'react';
import DropDownFilter from '../../../../../../components/custom/drop-down-filter';
import {
  PropertyLabels,
  PropertyStatusLabels,
  PropertyType,
} from '../../../../../../types/property';

interface DataTableProps {
  data: Property[];
}

const columns = getColumnsForProperties();

const PropertiesTable = <TData, TValue>({ data }: DataTableProps) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      columnFilters,
    },
  });

  return (
    <div className=" flex-wrap rounded-md w-full">
      {data && (
        <>
          <div className="flex flex-row-reverse gap-5 my-2">
            <DropDownFilter
              table={table}
              title={'Property Type'}
              selections={PropertyLabels}
              column={'propertyType'}
            />
            <DropDownFilter
              table={table}
              title={'Status'}
              selections={PropertyStatusLabels}
              column={'status'}
            />
          </div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    NO RESULTS
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex justify-end items-center mt-4 space-x-2">
            <PaginationPanel table={table} />
          </div>
        </>
      )}
    </div>
  );
};

export default PropertiesTable;
