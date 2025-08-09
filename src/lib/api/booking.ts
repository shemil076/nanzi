import axios from 'axios';
import { Booking, NewBooking } from '../../types/booking';
import { reformatBooking } from '../utils/booking';

export const createBooking = async (
  newBooking: NewBooking,
  accessToken: string,
): Promise<Booking> => {
    console.log("newBooking", newBooking)
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
