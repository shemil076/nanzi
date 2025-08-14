import axios from 'axios';
import {
  InvitationWithBookingId,
  NewTenantInvitation,
} from '../../types/tenant-invitation';
import { reformatInvitationWithBookingId } from '../utils/tenant-invitation';

export const sendInvitation = async (
  accessToken: string,
  newTenantInvitation: NewTenantInvitation,
): Promise<boolean> => {
  return axios
    .post('/api/tenant-invitation/send-invitation', newTenantInvitation, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(() => {
      return true;
    })
    .catch((err) => {
      throw err;
    });
};

export const verifyInvitation = async (
  token: string,
): Promise<InvitationWithBookingId> => {
  return axios
    .get(`/api/tenant-invitation/verify?token=${token}`)
    .then((res) => {
      return reformatInvitationWithBookingId(res.data);
    })
    .catch((err) => {
      throw err;
    });
};
