import { RegisterCredentials } from './auth';
import { NewBooking } from './booking';

export enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  EXPIRED = 'EXPIRED',
  CANCELED = 'CANCELED',
}
export interface NewTenantInvitation extends NewBooking {
  email: string;
}

export interface InvitationWithBookingId {
  id: string;
  email: string;
  status: InvitationStatus;
  acceptedById?: string;
  propertyId: string;
  bookingId?: string;
}

export interface AcceptInvitationCredentials extends RegisterCredentials {
  invitationId: string;
}
