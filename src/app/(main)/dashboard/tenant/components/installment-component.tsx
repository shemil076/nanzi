import { Check, CircleCheckBig, XCircle } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import { Card, CardContent } from '../../../../../components/ui/card';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../../components/ui/form';
import { Input } from '../../../../../components/ui/input';
import {
  Installment,
  InstallmentStatus,
} from '../../../../../types/installment';
import { usePayInstallment } from '../../../../../hooks/usePayment';
import { toast } from 'sonner';
import { useAuth } from '../../../../../hooks/useAuth';
import { formatToShortDate } from '../../../../../lib/utils/helperFunctions';
import { PaymentDeleteAlert } from './payment-delete-alert';

const installmentComponentForm = z.object({
  amount: z.coerce.number().min(1),
});

type InstallmentComponentFormType = z.infer<typeof installmentComponentForm>;

export function InstallmentComponent({
  installment,
  loadInstallments,
}: {
  installment: Installment;
  loadInstallments: () => Promise<void>;
}) {
  const form = useForm<InstallmentComponentFormType>({
    resolver: zodResolver(installmentComponentForm),
    defaultValues: {
      amount:
        installment.status == InstallmentStatus.PENDING
          ? 0
          : installment.amount,
    },
  });
  const { accessToken } = useAuth();

  const { payInstallmentPayment } = usePayInstallment();

  const isPaid = installment.status === InstallmentStatus.PAID;

  const handleOnSubmit = async (values: InstallmentComponentFormType) => {
    if (values.amount) {
      const { success } = await payInstallmentPayment(
        accessToken,
        installment.paymentId,
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

        await loadInstallments();
      }
    }
  };

  return (
    <Card className={`p-2 m-2 ${!isPaid && 'border-emerald-300'}`}>
      <CardContent className="flex flex-row gap-4">
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
              className="flex flex-row justify-between items-center"
            >
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="flex sm:flex-col md:flex-row">
                    <FormLabel>Amount (LKR)</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPaid}
                        // readOnly={isReadOnly}
                        className="border text-center disabled:text-black disabled:opacity-100 disabled:bg-gray-100 disabled:pointer-events-auto"
                        {...field}
                        placeholder="ex: 2000"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {isPaid && (
                <div className="w-1/3 flex flex-row items-center gap-5">
                  <div className="text-sm font-medium">Paid On</div>
                  <span className="w-1/2 border rounded-md p-1 text-center text-black opacity-100 bg-gray-100 pointer-events-auto">
                    {formatToShortDate(new Date(installment.paidAt))}
                  </span>
                </div>
              )}

              {isPaid ? (
                <PaymentDeleteAlert />
              ) : (
                <Button
                  variant={'outline'}
                  onClick={() => form.handleSubmit(handleOnSubmit)()}
                >
                  <Check color="green" />
                </Button>
              )}
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
