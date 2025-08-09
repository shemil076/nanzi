/* eslint-disable @typescript-eslint/no-explicit-any */
import { Booking, BookingStatus } from '../../types/booking';

export const reformatBooking = (data: any): Booking => {
  const formattedBooking: Booking = {
    id: data.id,
    userId: data.userId,
    propertyId: data.propertyId,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
    status: data.status as BookingStatus,
  };

  return formattedBooking;
};
