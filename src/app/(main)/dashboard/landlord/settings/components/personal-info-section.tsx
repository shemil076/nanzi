import z from 'zod';
import { User } from '../../../../../../types/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../../../components/ui/form';
import { useEffect, useState } from 'react';
import { Input } from '../../../../../../components/ui/input';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../../../../../components/ui/card';
import { Button } from '../../../../../../components/ui/button';
import { CircleCheckBig, Pencil, XCircle } from 'lucide-react';
import { useUpdateUser } from '../../../../../../hooks/use-user';
import { useAuth } from '../../../../../../hooks/useAuth';
import { toast } from 'sonner';

const personalInfoForm = z.object({
  email: z.string().email('Invalid email format'),
  firstName: z.string().min(3, 'First name must be at least 3 characters long'),
  lastName: z.string().min(3, 'Last name must be at least 3 characters long'),
  role: z.string(),
});

type PersonalInfoFormData = z.infer<typeof personalInfoForm>;

const PersonalInfoSection = ({ user }: { user: User }) => {
  const [isUpdateEnabled, setIsUpdateEnabled] = useState<boolean>(false);
  const [isEnableFooterButtons, setIsEnableFooterButtons] =
    useState<boolean>(false);
  const { accessToken } = useAuth();
  const [localStateUser, setLocalStateUser] = useState<User>(user);

  const { updateUser } = useUpdateUser();

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoForm),
    defaultValues: {
      email: localStateUser.email,
      firstName: localStateUser.firstName,
      lastName: localStateUser.lastName,
      role: localStateUser.role,
    },
  });

  const { watch } = form;
  const formValues = watch();

  useEffect(() => {
    const isModified =
      formValues.firstName != localStateUser.firstName ||
      formValues.lastName != localStateUser.lastName;

    setIsEnableFooterButtons(isModified);
  }, [formValues, localStateUser]);

  const handleOnCancel = () => {
    setIsEnableFooterButtons((prev) => !prev);
    setIsUpdateEnabled((prev) => !prev);
    form.reset();
  };

  const handleOnSubmit = async (values: PersonalInfoFormData) => {
    if (values) {
      const { success, user: updatedUser } = await updateUser(
        values.firstName,
        values.lastName,
        accessToken,
      );

      if (!success) {
        toast('Failed to update the issue', {
          icon: <XCircle className="text-red-500" />,
          className: 'flex items-center justify-center space-x-2',
        });
      } else if (success && updatedUser) {
        toast('Successfully updated the issue ', {
          icon: <CircleCheckBig className="text-green-500" />,
          className: 'flex items-center justify-center gap-5',
        });
        setLocalStateUser(updatedUser);
        form.reset({
          email: updatedUser.email,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          role: updatedUser.role,
        });
        setIsUpdateEnabled(false);
      }
    }
  };
  return (
    <Card className="border-0 shadow-none">
      <Form {...form}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <CardHeader>
            <CardAction>
              <Button onClick={() => setIsUpdateEnabled((prev) => !prev)}>
                <Pencil />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                disabled={!isUpdateEnabled}
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        className="border text-center disabled:text-black disabled:opacity-100 disabled:bg-gray-100 disabled:pointer-events-auto"
                        {...field}
                        placeholder="ex: tom@mail.com"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                disabled={!isUpdateEnabled}
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        className="border text-center disabled:text-black disabled:opacity-100 disabled:bg-gray-100 disabled:pointer-events-auto"
                        {...field}
                        placeholder="ex: tom@mail.com"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                disabled={true}
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="border text-center disabled:text-black disabled:opacity-100 disabled:bg-gray-100 disabled:pointer-events-auto"
                        {...field}
                        placeholder="ex: tom@mail.com"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                disabled={true}
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input
                        className="border text-center disabled:text-black disabled:opacity-100 disabled:bg-gray-100 disabled:pointer-events-auto"
                        {...field}
                        placeholder="ex: tom@mail.com"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          {isEnableFooterButtons && (
            <CardFooter className="flex md:flex-row md:justify-end mt-4 gap-3">
              <Button variant="outline" onClick={() => handleOnCancel()}>
                Cancel
              </Button>
              <Button onClick={() => form.handleSubmit(handleOnSubmit)()}>
                Update
              </Button>
            </CardFooter>
          )}
        </form>
      </Form>
    </Card>
  );
};

export default PersonalInfoSection;
