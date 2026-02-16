import { Check } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import { Card, CardContent } from '../../../../../components/ui/card';
import z from 'zod';
import { Payment } from '../../../../../types/payment';
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
import { Installment } from '../../../../../types/installment';

const installmentComponentForm = z.object({
  amount: z.coerce.number().min(1),
});

type InstallmentComponentFormType = z.infer<typeof installmentComponentForm>;

export function InstallmentComponent({
  currentPayment,
  installment,
}: {
  currentPayment: Payment;
  installment?: Installment;
}) {
  const form = useForm<InstallmentComponentFormType>({
    resolver: zodResolver(installmentComponentForm),
    defaultValues: {
      amount: 0,
    },
  });
  return (
    <Card className="p-2">
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
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        className="border text-center"
                        {...field}
                        placeholder="ex: 2000"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button variant={'outline'}>
                <Check color="green" />
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
