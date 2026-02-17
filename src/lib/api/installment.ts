import axios from 'axios';
import { Installment } from '../../types/installment';
import { reformatInstallment } from '../utils/installment';

export const fetchInstallmentsByPayment = (
  accessToken: string,
  paymentId: string,
): Promise<Installment[]> => {
  return axios
    .get(`/api/installment/all/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      return res.data.map((item) => {
        return reformatInstallment(item);
      });
    })
    .catch((err) => {
      throw err;
    });
};
