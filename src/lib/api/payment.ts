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

export const payEntierPayment = async (
  accessToken: string,
  paymentId: string,
  amount: number,
): Promise<Payment> => {
  console.log('amount:', amount, typeof amount);

  return axios
    .post(
      `/api/payment/full-payment`,
      {
        paymentId,
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    .then((res) => {
      return reformatPayment(res.data);
    })
    .catch((err) => {
      console.log('error => ', err);
      throw err;
    });
};

export const payInstallment = async (
  accessToken: string,
  paymentId: string,
  amount: number,
): Promise<Payment> => {
  return axios
    .post(
      `/api/payment/installment`,
      {
        paymentId,
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    .then((res) => {
      return reformatPayment(res.data);
    })
    .catch((err) => {
      console.log('error => ', err);
      throw err;
    });
};

export const deleteInstallmentAndUpdatePayment = (
  accessToken: string,
  paymentId: string,
  installmentId: string,
): Promise<Payment> => {
  return axios
    .delete(`/api/payment/${paymentId}/installment/${installmentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      console.log('payment => ', res.data);
      return reformatPayment(res.data);
    })
    .catch((err) => {
      console.log('error => ', err);
      throw err;
    });
};
