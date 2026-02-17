// import { Installment } from "./installment";

export enum PaymentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PAID = 'PAID',
  PARTIAL = 'PARTIAL',
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  proofUrl: string;
  paidAt: Date;
  dueDate: Date;
  status: PaymentStatus;
  createdAt: Date;
  // installments: Installment[];
}

export const PaymentStatusVariant: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: 'outline',
  [PaymentStatus.APPROVED]: 'default',
  [PaymentStatus.REJECTED]: 'destructive',
  [PaymentStatus.PAID]: 'paid',
  [PaymentStatus.PARTIAL]: 'partial',
};
