import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Payment } from '../../../../../../../types/payment';
import { getColumnsForPayments } from './payment-columns';
import PaymentComponents from './payment-component';
import PaginationPanel from '../../../../../../../components/custom/pagination';

interface PaymentHistoryProps {
  data: Payment[];
}

const columns = getColumnsForPayments();

const PaymentHistoryTable = ({ data }: PaymentHistoryProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 4,
      },
    },
  });
  return (
    <div>
      {data ? (
        <div>
          {table.getRowModel().rows.map((row, index) => (
            <div key={index}>
              <PaymentComponents payment={row.original} />
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

export default PaymentHistoryTable;
