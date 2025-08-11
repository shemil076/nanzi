import axios from 'axios';
import {
  Booking,
  BookingWithPropertyInfo,
  NewBooking,
} from '../../types/booking';
import {
  reformatBooking,
  reformatBookingWithPropertyInfo,
} from '../utils/booking';

export const createBooking = async (
  newBooking: NewBooking,
  accessToken: string,
): Promise<Booking> => {
  console.log('newBooking', newBooking);
  return axios
    .post('/api/booking/create', newBooking, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      return reformatBooking(res.data);
    })
    .catch((err) => {
      throw err;
    });
};

export const getPendingPropertyByTenant = async (
  accessToken,
): Promise<BookingWithPropertyInfo> => {
  return axios
    .get('/api/booking/pending-booking', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      return reformatBookingWithPropertyInfo(res.data);
    })
    .catch((err) => {
      console.log('Error occurred', err);
      throw err;
    });
};

export const approveBookingById = async (
  accessToken: string,
  id: string,
): Promise<Booking> => {
  console.log('id', id);
  return axios
    .patch(`/api/booking/approve-booking/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      return reformatBooking(res.data);
    })
    .catch((error) => {
      throw error;
    });
};
