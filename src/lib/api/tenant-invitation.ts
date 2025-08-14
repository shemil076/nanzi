import axios from 'axios';
import { NewTenantInvitation } from '../../types/tenant-invitation';

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
