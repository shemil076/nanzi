import { Property } from './property';

export interface NewBooking {
  propertyId: string;
  userId?: string;
  invitationId?: string;
  startDate: Date;
  endDate: Date;
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

export type BookingWithPropertyInfo = Booking & {
  property: Pick<Property, 'title' | 'address'>;
};
