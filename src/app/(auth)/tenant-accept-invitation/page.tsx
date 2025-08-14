'use client';

import { useSearchParams } from 'next/navigation';
import { useVerifyTenantInvitationToken } from '../../../hooks/use-tenant-invitation';
import { useEffect } from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import Spinner from '../../../components/custom/spinner';
import RegistrationComponent from './components/registration-component';
import { Ban, ClockFading } from 'lucide-react';

const AcceptInvitationPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { tenantInvitation, verifyTenantInvitation, isLoading, error } =
    useVerifyTenantInvitationToken();

  useEffect(() => {
    if (token) {
      verifyTenantInvitation(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-blue-100 ">
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

  if (error) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-blue-100">
        <Card className="w-1/3 h-1/2 flex flex-col items-center justify-center">
          <CardContent className="flex flex-col gap-10 items-center justify-center">
            <ClockFading size={100} className="animate-pulse" color="grey" />
            <div>The invitation has expired</div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-blue-100">
      {tenantInvitation ? (
        <div className="w-1/3 h-1/2 flex flex-col items-center justify-center">
          <RegistrationComponent
            invitationId={tenantInvitation.id}
            email={tenantInvitation.email}
          />
        </div>
      ) : (
        <Card className="w-1/3 h-1/2 flex flex-col items-center justify-center">
          <CardContent className="flex flex-col gap-10 items-center justify-center">
            <Ban size={100} className="animate-pulse" color="red" />
            <div>401 Unauthorized</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AcceptInvitationPage;
