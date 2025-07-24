import { ColumnDef } from '@tanstack/react-table';
import { Property, PropertyIcon, PropertyLabels } from '@/types/property';
import { formatPrice } from '@/lib/utils/helperFunctions';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { PropertyStatusLabels } from '@/types/property';
import { Badge } from '@/components/ui/badge';
import { PropertyStatusVariant } from '@/types/property';

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
    cell: ({ row }) => {
      return (
        <Badge variant={PropertyStatusVariant[row.original.status]}>
          {PropertyStatusLabels[row.original.status]}
        </Badge>
      );
    },
  },

  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      return <div>{formatPrice(row.original.price)}</div>;
    },
  },
  {
    accessorKey: '',
    header: ' ',
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      return (
        <div className="flex flex-row gap-2">
          <Button
            variant="secondary"
            className="hover:cursor-pointer "
            onClick={() =>
              router.push(`/dashboard/landlord/properties/${row.original.id}`)
            }
          >
            <ExternalLink size={15} color="grey" className="p-0" />
          </Button>
        </div>
      );
    },
  },
];
