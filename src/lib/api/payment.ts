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

export const fetchCurrentTenantsPayments = (
  accessToken: string,
  propertyId: string,
): Promise<Payment[]> => {
  return axios
    .get(`/api/payment/tenant/${propertyId}`, {
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

export const fetchTenantsCurrentPendingPayment = (
  accessToken: string,
  propertyId: string,
): Promise<Payment> => {
  return axios
    .get(`/api/payment/current/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      return reformatPayment(res.data);
    })
    .catch((err) => {
      throw err;
    });
};
