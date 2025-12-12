export enum Role {
  ADMIN = 'ADMIN',
  LANDLORD = 'LANDLORD',
  TENANT = 'TENANT',
}

export const RoleDisplayName: Record<Role, string> = {
  [Role.ADMIN]: 'Admin',
  [Role.LANDLORD]: 'Landlord',
  [Role.TENANT]: 'Tenant',
};
