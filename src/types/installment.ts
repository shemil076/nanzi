export interface Installment {
  id: string;
  paymentId: string;
  amount: number;
  paidAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
