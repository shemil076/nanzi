import { ColumnDef } from '@tanstack/react-table';
import { Payment } from '../../../../../../../types/payment';

export const getColumnsForPayments = (): ColumnDef<Payment>[] => [
  {
    accessorKey: 'id',
    header: '',
  },
];
