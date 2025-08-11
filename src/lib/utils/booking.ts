/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Booking,
  BookingStatus,
  BookingWithPropertyInfo,
} from '../../types/booking';

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

export const reformatBookingWithPropertyInfo = (
  data: any,
): BookingWithPropertyInfo => {
  const formattedBooking: BookingWithPropertyInfo = {
    id: data.id,
    userId: data.userId,
    propertyId: data.propertyId,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
    status: data.status as BookingStatus,
    property: {
      title: data.property.title,
      address: data.property.address,
    },
  };

  return formattedBooking;
};
