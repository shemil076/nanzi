import axios from 'axios';
import { reformatUser } from '../utils/user';
import { User } from '../../types/auth';

export const fetchTenants = async (
  accessToken: string,
  email: string,
): Promise<User[]> => {
  return axios
    .get('/api/tenant/search', {
      params: { email },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      return res.data.map((item) => {
        return reformatUser(item);
      });
    })
    .catch((err) => {
      throw err;
    });
};
