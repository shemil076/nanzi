/* eslint-disable @typescript-eslint/no-explicit-any */
import { Payment, PaymentStatus } from '../../types/payment';

export const reformatPayment = (data: any): Payment => {
  const formattedPayment: Payment = {
    id: data.id,
    bookingId: data.bookingId,
    amount: data.amount,
    proofUrl: data.proofUrl,
    paidAt: new Date(data.paidAt),
    dueDate: new Date(data.dueDate),
    status: data.status as PaymentStatus,
  };

  return formattedPayment;
};
