'use client';

import { ClockFading } from 'lucide-react';
import Spinner from '../../../../../components/custom/spinner';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../../components/ui/card';
import { useUser } from '../../../../../hooks/use-user';
import { useAuth } from '../../../../../hooks/useAuth';
import UserDetailsSection from './components/user-details-section';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../../components/ui/tabs';
import { Separator } from '../../../../../components/ui/separator';

const SettingsPage = () => {
  const { accessToken } = useAuth();

  const { user: userData, isLoading, error } = useUser(accessToken);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-blue-100 ">
        <Card className="w-1/3 h-1/2 flex flex-col items-center justify-center">
          <CardContent className="flex flex-col gap-10">
            <Spinner size={100} color="grey" />
            <div className="text-2xl animate-pulse font-bold">
              Loading user details
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
            <div>Error occurred while getting user data</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-blue-100">
        <Card className="w-1/3 h-1/2 flex flex-col items-center justify-center">
          <CardContent className="flex flex-col gap-10 items-center justify-center">
            <div>No user found</div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Settings</CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="my-profile">
          <TabsList>
            <TabsTrigger value="my-profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="my-profile" className="flex flex-col p-10 gap-5">
            <UserDetailsSection user={userData} />

            <div className="flex flex-row items-center gap-5">
              <span className="font-bold">Personal Info</span>
              <div className="w-4/5">
                <Separator />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
