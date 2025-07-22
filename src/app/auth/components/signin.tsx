'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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
import { useAuth } from '@/hooks/aueAuth';
import { LoginCredentials } from '@/types/auth';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type registrationFormData = z.infer<typeof formSchema>;

const SignInForm = () => {
  const router = useRouter();

  const form = useForm<registrationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { user, login } = useAuth();

  const handleOnSubmit = async (value: z.infer<typeof formSchema>) => {
    if (value) {
      const loginDetails: LoginCredentials = {
        email: value.email,
        password: value.password,
      };

      await login(loginDetails);

      if (user) {
        router.push('/home');
      }
    }
  };

  return (
    <Card className={`w-full m-5 sm:w-1/2`}>
      <CardHeader>
        <div className="flex flex-col items-center gap-5">
          <div className="museo-font text-3xl text-center">nanzi</div>

          <div className="text-center m-2">
            <span className="text-3xl font-bold">Sign in</span>
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
                Sign In
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default SignInForm;
