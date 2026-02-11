import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../../../../components/ui/card';
import { formatPrice } from '../../../../../lib/utils/helperFunctions';
import { AddPaymentDialog } from './add-payment-dialog';

const NextPayment = ({ monthlyRent }: { monthlyRent: number }) => {
  return (
    <Card>
      <CardHeader>
        <span className="text-2xl font-bold">Next Payment</span>
      </CardHeader>

      <CardContent className="flex flex-col justify-center items-center">
        <span className="text-4xl font-bold text-red-600">
          {formatPrice(monthlyRent ? monthlyRent : 0)}
        </span>
      </CardContent>
      <CardFooter className="flex flex-col w-full">
        <AddPaymentDialog />
      </CardFooter>
    </Card>
  );
};

export default NextPayment;
