import { Check, Eye, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import {
  formatDateForLocal,
  formatPrice,
  formatToShortDate,
} from '../../lib/utils/helperFunctions';
import { Payment, PaymentStatusVariant } from '../../types/payment';

interface PaymentComponentsProps {
  payment: Payment;
}

const PaymentComponents = ({ payment }: PaymentComponentsProps) => {
  return (
    <Card className="rounded-sm p-0 text-sm gap-0 my-3">
      <CardHeader className="flex flex-col p-2 m-0">
        <div className="w-full flex flex-row  justify-between">
          <div className="flex flex-col gap-1 ">
            <span className="font-semibold">
              {formatDateForLocal(payment.dueDate)}
            </span>

            <span className="text-xs font-light text-gray-500">
              Due Date {formatToShortDate(payment.dueDate)}
            </span>
          </div>

          <div className="flex flex-col gap-1 items-center">
            <span className="font-semibold">{formatPrice(payment.amount)}</span>
            <Badge variant={PaymentStatusVariant[payment.status]}>
              {payment.status}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="m-0 p-2 w-full flex flex-row justify-between">
        <div className="flex flex-row items-center font-light">
          <span>Payment Proof: </span>
          {payment.proofUrl ? <Check size={18} /> : <X size={18} />}
          {payment.proofUrl ? 'Uploaded' : 'Not uploaded'}
        </div>

        <div>
          <Button variant="outline" className="h-8">
            <Eye />
            <span>View</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentComponents;
