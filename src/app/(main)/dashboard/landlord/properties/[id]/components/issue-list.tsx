import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import PaymentComponents from './payment-component';
import PaginationPanel from '../../../../../../../components/custom/pagination';
import { Issue } from '../../../../../../../types/issue';
import { getColumnsForIssues } from './issue-columns';
import IssueComponent from './issue-component';

interface IssueListProps {
  data: Issue[];
}

const columns = getColumnsForIssues();

const IssueList = ({ data }: IssueListProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 3,
      },
    },
  });
  return (
    <div>
      {data ? (
        <div>
          {table.getRowModel().rows.map((row, index) => (
            <div key={index}>
              <IssueComponent issue={row.original} />
            </div>
          ))}

          <div className="flex justify-end items-center mt-4 ">
            <PaginationPanel table={table} />
          </div>
        </div>
      ) : (
        <div>No trash for the moment</div>
      )}
    </div>
  );
};

export default IssueList;
