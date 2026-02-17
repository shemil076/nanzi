'use client';
import { UseFormReturn } from 'react-hook-form';
import { FullPaymentFormType } from './add-payment-dialog';
import { Form } from '../../../../../components/ui/form';
import { MonthlyRentContainer } from './monthly-rent-container';
import { InstallmentComponent } from './installment-component';
import { Payment } from '../../../../../types/payment';
import { Button } from '../../../../../components/ui/button';
import { useEffect, useState } from 'react';
import { useInstallments } from '../../../../../hooks/use-intallment';
import { useAuth } from '../../../../../hooks/useAuth';
import {
  Installment,
  InstallmentStatus,
} from '../../../../../types/installment';

type Props = {
  currentPayment: Payment;
  //   setIsOpen: (boolean) => void;
  form: UseFormReturn<FullPaymentFormType>;
  //   handleOnSubmit: (FullPaymentFormType) => void;
};

export function InstallmentPaymentContainer({ form, currentPayment }: Props) {
  const { accessToken } = useAuth();
  const { installments: fetchedInstallments, loadInstallments } =
    useInstallments(accessToken, currentPayment.id);

  const [installments, setInstallment] = useState<Installment[] | null>(
    fetchedInstallments,
  );

  useEffect(() => {
    setInstallment(fetchedInstallments);
  }, [fetchedInstallments, setInstallment]);

  const addInstallment = () => {
    setInstallment((prev) => {
      const current = prev ?? [];

      return [
        ...current,
        {
          id: '',
          amount: 0,
          paymentId: currentPayment.id,
          status: InstallmentStatus.PENDING,
        },
      ];
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-5 mt-5">
        <Form {...form}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <MonthlyRentContainer form={form} />
          </form>
        </Form>
        <Button onClick={() => addInstallment()}>+ Add an Installment</Button>

        {installments &&
          installments.map((installment, index) => {
            return (
              <InstallmentComponent
                key={index}
                installment={installment}
                loadInstallments={loadInstallments}
              />
            );
          })}
      </div>
    </div>
  );
}
