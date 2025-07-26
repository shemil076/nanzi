'use client';

import {
  Card,
  CardContent,
  CardHeader,
} from '../../../../../../../components/ui/card';
import { useAuth } from '../../../../../../../hooks/useAuth';
import { usePaymentsByProperty } from '../../../../../../../hooks/usePayment';
import PaymentHistoryTable from './payment-history';

const PaymentsContainer = ({ propertyId }: { propertyId: string }) => {
  const { accessToken } = useAuth();
  const { payments } = usePaymentsByProperty(accessToken, propertyId);

  return (
    <Card className="gap-0">
      <CardHeader className="flex flex-row">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Payment History</span>
          <span className="text-sm text-gray-400">Track the rent payments</span>
        </div>

        <div></div>
      </CardHeader>
      <CardContent className="">
        <PaymentHistoryTable data={payments} />
      </CardContent>
    </Card>
  );
};

export default PaymentsContainer;
