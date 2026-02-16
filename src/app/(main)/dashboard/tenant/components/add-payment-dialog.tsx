import { Button } from '../../../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../../components/ui/dialog';
import { CircleCheckBig, CreditCard, XCircle } from 'lucide-react';
import { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../../components/ui/tabs';
import { Payment } from '../../../../../types/payment';
import { FullPaymentContainer } from './full-payment-container';
import z from 'zod';
import { usePayFullPayment } from '../../../../../hooks/usePayment';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../../../../hooks/useAuth';
import { toast } from 'sonner';
import { InstallmentPaymentContainer } from './installment-payment-container';

const fullPaymentForm = z.object({
  amount: z.coerce.number().min(1),
});

export type FullPaymentFormType = z.infer<typeof fullPaymentForm>;

export function AddPaymentDialog({
  currentPayment,
}: {
  currentPayment: Payment;
}) {
  const form = useForm<FullPaymentFormType>({
    resolver: zodResolver(fullPaymentForm),
    defaultValues: {
      amount: currentPayment.amount,
    },
  });

  const { payFullPayment, paidPayment, isLoading } = usePayFullPayment();
  const { accessToken } = useAuth();

  const handleOnSubmit = async (values: FullPaymentFormType) => {
    console.log('=>>> Value', values.amount);
    if (values.amount) {
      const { success } = await payFullPayment(
        accessToken,
        currentPayment.id,
        values.amount,
      );

      if (!success) {
        toast('Failed to pay the full amount', {
          icon: <XCircle className="text-red-500" />,
          className: 'flex items-center justify-center space-x-2',
        });
      } else if (success) {
        toast('Successfully paid the full amount ', {
          icon: <CircleCheckBig className="text-green-500" />,
          className: 'flex items-center justify-center gap-5',
        });
      }
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const isPaymentPaid = currentPayment.status === 'PAID';
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex flex-row w-full items-center"
          disabled={isPaymentPaid}
        >
          <CreditCard />
          <span>Add payment</span>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-full sm:max-w-[00px] md:max-w-[900px]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>New Payment</DialogTitle>
          <div className="flex flex-row justify-center"></div>
          <DialogDescription />
        </DialogHeader>

        <Tabs defaultValue="full-payment">
          <TabsList>
            <TabsTrigger value="full-payment">Pay the Full Amount</TabsTrigger>
            <TabsTrigger value="installments">Pay as Installments</TabsTrigger>
          </TabsList>
          <TabsContent value="full-payment">
            <FullPaymentContainer
              currentPayment={currentPayment}
              setIsOpen={setIsOpen}
              form={form}
              handleOnSubmit={handleOnSubmit}
            />
          </TabsContent>
          <TabsContent value="installments">
            <InstallmentPaymentContainer form={form} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
