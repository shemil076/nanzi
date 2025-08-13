import { NewBooking } from './booking';

export interface NewTenantInvitation extends NewBooking {
  email: string;
}
