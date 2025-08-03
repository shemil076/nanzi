import { ColumnDef } from '@tanstack/react-table';
import { Issue } from '../../types/issue';

export const getColumnsForIssues = (): ColumnDef<Issue>[] => [
  {
    accessorKey: 'id',
    header: '',
  },
];
