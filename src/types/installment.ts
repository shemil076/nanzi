export interface Installment {
  id: string;
  paymentId: string;
  amount: number;
  paidAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  status: InstallmentStatus;
}

export enum InstallmentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PAID = 'PAID',
}

export const InstallmentStatusVariant: Record<InstallmentStatus, string> = {
  [InstallmentStatus.PENDING]: 'outline',
  [InstallmentStatus.APPROVED]: 'default',
  [InstallmentStatus.REJECTED]: 'destructive',
  [InstallmentStatus.PAID]: 'paid',
};
