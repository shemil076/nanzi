/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  InvitationStatus,
  InvitationWithBookingId,
} from '../../types/tenant-invitation';

export const reformatInvitationWithBookingId = (
  data: any,
): InvitationWithBookingId => {
  const reformattedInvitation: InvitationWithBookingId = {
    id: data.id,
    email: data.email,
    status: data.status as InvitationStatus,
    propertyId: data.propertyId,
    bookingId: data.booking.id ?? null,
  };

  return reformattedInvitation;
};
