/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../../types/auth';

export const reformatUser = (data: any): User => {
  const formattedUser: User = {
    id: data.id,
    email: data.email,
    role: data.role,
    firstName: data.firstName ?? null,
    lastName: data.lastName ?? null,
  };

  return formattedUser;
};
