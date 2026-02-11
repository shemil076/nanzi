import axios from 'axios';
import { User } from '../../types/auth';
import { reformatUser } from '../utils/user';

export const fetchUser = (accessToken: string): Promise<User> => {
  return axios
    .get('/api/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      return reformatUser(res.data);
    })
    .catch((err) => {
      throw err;
    });
};

export const updateUserInfo = (
  firstName: string,
  lastName: string,
  accessToken: string,
): Promise<User> => {
  return axios
    .patch(
      '/api/user/updated-user',
      {
        firstName,
        lastName,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    .then((res) => {
      return reformatUser(res.data);
    })
    .catch((err) => {
      throw err;
    });
};
