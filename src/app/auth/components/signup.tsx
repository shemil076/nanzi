'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Building2, User } from 'lucide-react';
import { useState } from 'react';

const SignUp = ({ isTenant }: { isTenant: boolean }) => {
  const [isTenantSignup, setIsTenantSignUp] = useState(isTenant);

  return (
    <Card className={`w-full m-5 sm:w-1/2`}>
      <CardHeader>
        <div className="flex flex-col items-center gap-5">
          <div className="museo-font text-3xl text-center">nanzi</div>

          <div className="text-center m-2">
            <span className="text-3xl font-bold">Create Your Account</span>
            <div>
              {isTenantSignup ? (
                <div>
                  Join <span className="museo-font">nanci</span> as a Tenant
                </div>
              ) : (
                <div>
                  Join <span className="museo-font">nanci</span> as a Landlord
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row space-x-1">
            <Button
              className="sm:w-1/2"
              variant={isTenantSignup ? 'outline' : 'default'}
              onClick={() => setIsTenantSignUp(false)}
            >
              <Building2 />
              <span>Landlord</span>
            </Button>
            <Button
              className="sm:w-1/2"
              variant={isTenantSignup ? 'default' : 'outline'}
              onClick={() => setIsTenantSignUp(true)}
            >
              <User />
              <span>Tenant</span>
            </Button>
          </div>
          <Separator />

          <Button className="w-full" variant={'secondary'}>
            {' '}
            Continue with Google
          </Button>
          <Button className="w-full" variant={'secondary'}>
            {' '}
            Continue with Facebook
          </Button>

          <div className="grid grid-cols-3 items-center gap-2">
            <div className="w-full border h-0"></div>
            <span className="text-sm text-gray-600 font-semibold">
              OR CONTINUE WITH EMAIL
            </span>
            <div className="w-full border h-0"></div>
          </div>
        </div>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default SignUp;

{
  /* <User  color="#29a34a" size={40}/>: <Building2  color="blue" size={40}/> */
}
