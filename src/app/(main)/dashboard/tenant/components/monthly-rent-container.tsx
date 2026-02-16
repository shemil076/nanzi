import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../../components/ui/form';
import { Input } from '../../../../../components/ui/input';
import { Separator } from '../../../../../components/ui/separator';
import { FullPaymentFormType } from './add-payment-dialog';

type Props = {
  form: UseFormReturn<FullPaymentFormType>;
};

export function MonthlyRentContainer({ form }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-5">
        <span className="font-bold">Monthly Rent</span>
        <div className="w-4/5">
          <Separator />
        </div>
      </div>
      <div className="mt-5">
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
      </div>
    </div>
  );
}
