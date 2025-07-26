import axios from 'axios';
import { Payment } from '../../types/payment';
import { reformatPayment } from '../utils/payment';

export const fetchPaymentsByProperty = (
  accessToken: string,
  propertyId: string,
): Promise<Payment[]> => {
  return axios
    .get(`/api/payment/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      return res.data.map((item) => {
        return reformatPayment(item);
      });
    })
    .catch((err) => {
      throw err;
    });
};
