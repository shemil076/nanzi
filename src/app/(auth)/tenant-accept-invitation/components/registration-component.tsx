'use client';
import z from 'zod';
import { Card, CardContent } from '../../../../components/ui/card';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../../../../components/ui/button';
import { useAcceptTenantInvitation } from '../../../../hooks/use-tenant-invitation';
import { AcceptInvitationCredentials } from '../../../../types/tenant-invitation';
import { toast } from 'sonner';
import { CircleCheckBig, XCircle } from 'lucide-react';

const formSchema = z.object({
  firstName: z.string().min(3, 'First name must be at least 3 characters long'),
  lastName: z.string().min(3, 'Last name must be at least 3 characters long'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type registrationFormData = z.infer<typeof formSchema>;

const RegistrationComponent = ({
  invitationId,
  email,
}: {
  invitationId: string;
  email: string;
}) => {
  const { acceptTenantInvitation } = useAcceptTenantInvitation();
  const router = useRouter();
  const form = useForm<registrationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      password: '',
    },
  });

  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('running');
    if (values && invitationId && email) {
      const credentials: AcceptInvitationCredentials = {
        invitationId: invitationId,
        firstName: values.firstName,
        lastName: values.lastName,
        email: email,
        password: values.password,
      };

      const { success } = await acceptTenantInvitation(credentials);

      if (!success) {
        toast('Failed to send the invitation', {
          icon: <XCircle className="text-red-500" />,
          className: 'flex items-center justify-center space-x-2',
        });
      } else {
        toast('Successfully sent the invitation', {
          icon: <CircleCheckBig className="text-green-500" />,
          className: 'flex items-center justify-center gap-5',
        });

        router.push('/auth/signin');
      }
    }
  };
  return (
    <Card className="w-full">
      <CardContent className="w-full flex flex-col gap-5">
        <div>
          <div className="museo-font text-3xl text-center">nanzi</div>

          <div className="flex flex-col gap-3 text-center m-2">
            <span className="text-3xl font-bold">Create Your Account</span>
            <div>
              <div>
                Join <span className="museo-font">nanzi</span> as a Tenant
              </div>
            </div>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="flex flex-col w-full gap-5">
              <div className="w-full flex flex-row  gap-5">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border text-center disabled:text-black disabled:opacity-100"
                          {...field}
                          placeholder="ex: Tom"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          className="  border text-center disabled:text-black disabled:opacity-100"
                          {...field}
                          placeholder="ex:Cruise"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="border text-center disabled:text-black disabled:opacity-100"
                        {...field}
                        placeholder="Password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                onClick={() => {
                  form.handleSubmit(handleOnSubmit)();
                }}
              >
                Create Account
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegistrationComponent;
