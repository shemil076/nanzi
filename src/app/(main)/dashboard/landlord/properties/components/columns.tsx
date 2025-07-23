import { ColumnDef } from '@tanstack/react-table';
import {
  Property,
  PropertyIcon,
  PropertyLabels,
} from '../../../../../../types/property';
import { formatPrice } from '../../../../../../lib/utils/helperFunctions';

export const getColumnsForProperties = (): ColumnDef<Property>[] => [
  {
    accessorKey: 'propertyType',
    header: 'Property Type',
    cell: ({ row }) => {
      const IconComponent = PropertyIcon[row.original.propertyType];
      return (
        <div className="flex flex-row items-center gap-3">
          <IconComponent size={24} color="blue" />
          <span>{PropertyLabels[row.original.propertyType]}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },

  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      return <div>{formatPrice(row.original.price)}</div>;
    },
  },
];
