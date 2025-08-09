export interface NewBooking {
  propertyId: string;
  userId: string;
  startDate: Date;
  endDate?: Date;
}

export enum BookingStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export interface Booking {
  id: string;
  userId: string;
  propertyId: string;
  startDate: Date;
  endDate: Date;
  status: BookingStatus;
}
