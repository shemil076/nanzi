'use client';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import {
  Building2,
  CreditCard,
  FileText,
  House,
  PaintRoller,
  User,
  Users,
} from 'lucide-react';

const RegisterCard = ({ isTenant }: { isTenant: boolean }) => {
  const router = useRouter();
  return (
    <Card
      className={`w-full m-3 sm:w-1/3  sm:m-0 justify-center gap-2 border- ${isTenant ? 'hover:border-green-500' : 'hover:border-blue-500'}`}
    >
      <CardHeader className="justify-center ">
        <div
          className={`w-15 h-15 ${isTenant ? 'bg-green-200' : 'bg-blue-200'} flex items-center justify-center justify-self-center rounded-full`}
        >
          {isTenant ? (
            <User color="#29a34a" size={40} />
          ) : (
            <Building2 color="blue" size={40} />
          )}
        </div>
        <span className="text-lg font-bold">
          {isTenant ? "I'm a Tenant" : "I'm a Landlord"}
        </span>
      </CardHeader>
      <CardContent className="justify-center pt-0 mb-3">
        <div className="pt-0 p-5  font-semibold text-center text-gray-500 justify-self-center ">
          {isTenant
            ? 'Find properties and manage your rental experience'
            : 'Manage your properties, tenants, and rental income'}
        </div>

        {isTenant ? (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <House color="#3b81f6" size={17} />
              <span className="text-gray-800">Browse available properties</span>
            </div>

            <div className="flex flex-row items-center gap-2">
              <CreditCard color="#3b81f6" size={17} />
              <span>Submit payment proofs</span>
            </div>

            <div className="flex flex-row items-center gap-2">
              <FileText color="#3b81f6" size={17} />
              <span>Report property issues</span>
            </div>

            <div className="flex flex-row items-center gap-2">
              <PaintRoller color="#3b81f6" size={17} />
              <span> Get maintenance updates</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <House color="#40ce86" size={17} />
              <span className="text-gray-800">List and manage properties</span>
            </div>

            <div className="flex flex-row items-center gap-2">
              <Users color="#40ce86" size={17} />
              <span>Track tenant information</span>
            </div>

            <div className="flex flex-row items-center gap-2">
              <CreditCard color="#40ce86" size={17} />
              <span>Monitor rent payment</span>
            </div>

            <div className="flex flex-row items-center gap-2">
              <FileText color="#40ce86" size={17} />
              <span>Document management</span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        {isTenant ? (
          <Button
            className="w-full"
            variant={'outline'}
            onClick={() => router.push('/auth/signup/?isTenant=true')}
          >
            Start as Tenant
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={() => router.push('/auth/signup/?isTenant=false')}
          >
            Start as Landlord
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RegisterCard;
