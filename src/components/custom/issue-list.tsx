import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { getColumnsForIssues } from './issue-columns';
import IssueComponent from './issue-component';
import { Issue } from '../../types/issue';
import PaginationPanel from './pagination';

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
        <div>No issues for the moment</div>
      )}
    </div>
  );
};

export default IssueList;
