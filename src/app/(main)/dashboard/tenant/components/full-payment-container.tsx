import z from 'zod';
import { Separator } from '../../../../../components/ui/separator';
import { Payment } from '../../../../../types/payment';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../../components/ui/form';
import { Input } from '../../../../../components/ui/input';
import { Button } from '../../../../../components/ui/button';
import { usePayFullPayment } from '../../../../../hooks/usePayment';
import { useAuth } from '../../../../../hooks/useAuth';
import { CircleCheckBig, XCircle } from 'lucide-react';
import { toast } from 'sonner';

const fullPaymentForm = z.object({
  amount: z.coerce.number().min(1),
});

type FullPaymentFormType = z.infer<typeof fullPaymentForm>;

export function FullPaymentContainer({
  currentPayment,
  setIsOpen,
}: {
  currentPayment: Payment;
  setIsOpen: (boolean) => void;
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

  return (
    <div className="flex flex-col p-5">
      <div className="flex flex-row items-center gap-5">
        <span className="font-bold">Monthly Rent</span>
        <div className="w-4/5">
          <Separator />
        </div>
      </div>

      <div className="mt-5">
        <Form {...form}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="flex sm:flex-col md:flex-row">
                  <FormLabel>Rental for this month (LKR)</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      className="border text-center text-black opacity-100 bg-gray-100  pointer-events-none"
                      {...field}
                      placeholder="ex: tom@mail.com"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-3">
              <Button onClick={() => form.handleSubmit(handleOnSubmit)()}>
                Pay now ( LKR {currentPayment.amount})
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
