import { Installment } from '../../types/installment';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const reformatInstallment = (data: any): Installment => {
  const formattedInstallment: Installment = {
    id: data.id,
    paymentId: data.paymentId,
    amount: data.amount,
    paidAt: data.paidAt,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };

  return formattedInstallment;
};
