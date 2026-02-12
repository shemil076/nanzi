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

const fullPaymentForm = z.object({
  amount: z.coerce.number().min(1),
});

type FullPaymentFormType = z.infer<typeof fullPaymentForm>;

export function FullPaymentContainer({
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
              disabled={true}
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="flex sm:flex-col md:flex-row">
                  <FormLabel>Rental for this month (LKR)</FormLabel>
                  <FormControl>
                    <Input
                      className="border text-center disabled:text-black disabled:opacity-100 disabled:bg-gray-100 disabled:pointer-events-auto"
                      {...field}
                      placeholder="ex: tom@mail.com"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-3">
              <Button onClick={() => {}}>
                Pay now ( LKR {currentPayment.amount})
              </Button>
              <Button variant="outline" onClick={() => {}}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
