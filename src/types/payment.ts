export enum PaymentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  proofUrl: string;
  paidAt: Date;
  status: PaymentStatus;
}

export const PaymentStatusVariant: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: 'outline',
  [PaymentStatus.APPROVED]: 'default',
  [PaymentStatus.REJECTED]: 'destructive',
};
