import { Payment } from '../../../../../types/payment';
import { UseFormReturn } from 'react-hook-form';
import { Form } from '../../../../../components/ui/form';
import { Button } from '../../../../../components/ui/button';
import { MonthlyRentContainer } from './monthly-rent-container';
import { FullPaymentFormType } from './add-payment-dialog';

type Props = {
  currentPayment: Payment;
  setIsOpen: (boolean) => void;
  form: UseFormReturn<FullPaymentFormType>;
  handleOnSubmit: (FullPaymentFormType) => void;
};

export function FullPaymentContainer({
  currentPayment,
  setIsOpen,
  form,
  handleOnSubmit,
}: Props) {
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
