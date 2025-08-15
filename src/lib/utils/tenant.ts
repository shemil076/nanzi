/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tenant } from '../../types/tenant';

export const reformatTenant = (data: any): Tenant => {
  const formattedTenant: Tenant = {
    id: data.id,
    email: data.email,
    firstName: data.firstName ?? null,
    lastName: data.lastName ?? null,
  };
  return formattedTenant;
};
