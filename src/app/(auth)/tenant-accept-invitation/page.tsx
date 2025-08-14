'use client';

import { useSearchParams } from 'next/navigation';
import { useVerifyTenantInvitationToken } from '../../../hooks/use-tenant-invitation';
import { useEffect } from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import Spinner from '../../../components/custom/spinner';

const AcceptInvitationPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { tenantInvitation, verifyTenantInvitation, isLoading } =
    useVerifyTenantInvitationToken();

  useEffect(() => {
    if (token) {
      verifyTenantInvitation(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Card className="w-1/3 h-1/2 flex flex-col items-center justify-center">
          <CardContent className="flex flex-col gap-10">
            <Spinner size={100} color="grey" />
            <div className="text-2xl animate-pulse font-bold">
              Verifying your invitation
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {tenantInvitation && (
        <div className="flex flex-col">
          Invitation details
          <span>id: {tenantInvitation.id}</span>
          <span>Email: {tenantInvitation.email}</span>
          <span>property id: {tenantInvitation.propertyId}</span>
          <span>booking id: {tenantInvitation.bookingId}</span>
        </div>
      )}
    </div>
  );
};

export default AcceptInvitationPage;
