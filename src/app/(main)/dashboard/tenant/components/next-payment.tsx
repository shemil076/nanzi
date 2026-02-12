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
  const { payment, fetchPayment, isLoading, error } =
    useTenantsCurrentPendingPayment(accessToken, propertyId);

  if (!payment) return;
  return (
    <Card>
      <CardHeader>
        <span className="text-2xl font-bold">Next Payment</span>
      </CardHeader>

      <CardContent className="flex flex-col justify-center items-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <span className="text-4xl font-bold text-red-600">
            {formatPrice(payment ? payment.amount : 0)}
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
