import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../../../../components/ui/card';
import { Spinner } from '../../../../../components/ui/spinner';
import { useAuth } from '../../../../../hooks/useAuth';
import { useTenantsCurrentPendingPayment } from '../../../../../hooks/usePayment';
import { formatPrice } from '../../../../../lib/utils/helperFunctions';
import { AddPaymentDialog } from './add-payment-dialog';

const NextPayment = ({ propertyId }: { propertyId: string }) => {
  const { accessToken } = useAuth();
  const { payment, isLoading } = useTenantsCurrentPendingPayment(
    accessToken,
    propertyId,
  );

  if (!payment) return;
  const isPaymentPaid = payment.status === 'PAID';
  return (
    <Card>
      <CardHeader>
        {isPaymentPaid ? (
          <span className="text-2xl font-bold">Paid Amount</span>
        ) : (
          <span className="text-2xl font-bold">Next Payment</span>
        )}
      </CardHeader>

      <CardContent className="flex flex-col justify-center items-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <span
            className={`text-4xl font-bold ${isPaymentPaid ? `text-green-600` : `text-red-600`} `}
          >
            {formatPrice(payment.amount)}
          </span>
        )}
      </CardContent>
      <CardFooter className="flex flex-col w-full">
        <AddPaymentDialog currentPayment={payment} />
      </CardFooter>
    </Card>
  );
};

export default NextPayment;
