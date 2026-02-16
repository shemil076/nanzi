import { UseFormReturn } from 'react-hook-form';
import { FullPaymentFormType } from './add-payment-dialog';
import { Form } from '../../../../../components/ui/form';
import { MonthlyRentContainer } from './monthly-rent-container';

type Props = {
  //   currentPayment: Payment;
  //   setIsOpen: (boolean) => void;
  form: UseFormReturn<FullPaymentFormType>;
  //   handleOnSubmit: (FullPaymentFormType) => void;
};

export function InstallmentPaymentContainer({ form }: Props) {
  return (
    <div className="flex flex-col">
      <div className="mt-5">
        <Form {...form}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
            className="flex flex-col gap-5"
          >
            <MonthlyRentContainer form={form} />
          </form>
        </Form>
      </div>
    </div>
  );
}
