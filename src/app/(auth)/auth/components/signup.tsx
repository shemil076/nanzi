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
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterCredentials } from '@/types/auth';
import { Role } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';

const formSchema = z.object({
  email: z.string().email('Invalid email format'),
  firstName: z.string().min(3, 'First name must be at least 3 characters long'),
  lastName: z.string().min(3, 'Last name must be at least 3 characters long'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type registrationFormData = z.infer<typeof formSchema>;

const SignUp = ({ isTenant }: { isTenant: boolean }) => {
  const router = useRouter();
  const [isTenantSignup, setIsTenantSignUp] = useState(isTenant);

  const form = useForm<registrationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
  });

  const { user, register } = useAuth();

  const handleOnSubmit = async (value: z.infer<typeof formSchema>) => {
    if (value) {
      const newUser: RegisterCredentials = {
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        password: value.password,
        role: isTenantSignup ? Role.TENANT : Role.LANDLORD,
      };
      await register(newUser);

      if (user) {
        router.push('/dashboard');
      }
    }
  };

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
                  Join <span className="museo-font">nanzi</span> as a Tenant
                </div>
              ) : (
                <div>
                  Join <span className="museo-font">nanzi</span> as a Landlord
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
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="border text-center disabled:text-black disabled:opacity-100"
                        {...field}
                        placeholder="ex: tom@mail.com"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
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
      <CardFooter></CardFooter>
    </Card>
  );
};

export default SignUp;
