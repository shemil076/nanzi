/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../../components/ui/dialog';
import { CalendarIcon, CircleCheckBig, UserPlus, XCircle } from 'lucide-react';
import { Button } from '../../../../../components/ui/button';
import { useAuth } from '../../../../../hooks/useAuth';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../../../../components/ui/command';
import { useSearchTenant } from '../../../../../hooks/useTenant';
import { User } from '../../../../../types/auth';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../../components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../../../components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '../../../../../components/ui/calendar';
import { Input } from '../../../../../components/ui/input';
import { Label } from '../../../../../components/ui/label';
import { useCreateBooking } from '../../../../../hooks/useBooking';
import { toast } from 'sonner';
import { NewBooking } from '../../../../../types/booking';

const rentFormSchema = z.object({
  startDate: z.date().nullable(),
  endDate: z.date().nullable().optional(),
});

const inviteTenantFormSchema = z.object({
  email: z.string().email('Invalid email format'),
});

type RentFormType = z.infer<typeof rentFormSchema>;
type InviteTenantFormType = z.infer<typeof inviteTenantFormSchema>;

interface RentPropertyFormProps {
  propertyId: string;
  loadProperty: () => Promise<void>;
}
const RentPropertyForm = ({
  propertyId,
  loadProperty,
}: RentPropertyFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { accessToken } = useAuth();
  const { tenants, isLoading } = useSearchTenant(accessToken, query);
  const [selectedTenant, setSelectedTenant] = useState<User>(null);
  const [showNoResults, setShowNoResults] = useState<boolean>(false);
  const [results, setResults] = useState<User[] | []>([]);
  const { addBooking, booking } = useCreateBooking();

  const form = useForm<RentFormType>({
    resolver: zodResolver(rentFormSchema),
  });

  // const invite for

  useEffect(() => {
    if (tenants) {
      setResults(tenants);
    }

    if (query.length < 1) {
      setResults([]);
      setShowNoResults(false);
    }
  }, [query, tenants]);

  useEffect(() => {
    if (selectedTenant) {
      setQuery('');
      setShowNoResults(false);
    }
  }, [selectedTenant]);

  useEffect(() => {
    if (query.length > 1) {
      if (results.length < 1) {
        setShowNoResults(true);
      } else {
        setShowNoResults(false);
      }
    }
  }, [results, query]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      form.reset();
      setSelectedTenant(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleOnSubmit = async (values: z.infer<typeof rentFormSchema>) => {
    if (values) {
      const newBooking: NewBooking = {
        propertyId: propertyId,
        userId: selectedTenant.id,
        startDate: values.startDate,
        endDate: values.endDate,
      };

      const { success } = await addBooking(newBooking, accessToken);

      if (!success) {
        toast('Failed to rent the property', {
          icon: <XCircle className="text-red-500" />,
          className: 'flex items-center justify-center space-x-2',
        });
      } else {
        toast('Successfully rented the property ', {
          icon: <CircleCheckBig className="text-green-500" />,
          className: 'flex items-center justify-center gap-5',
        });

        loadProperty();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <div className="flex flex-row justify-center items-center gap-3">
            <UserPlus size={20} />
            Rent this
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-full sm:max-w-[00px] md:max-w-[700px]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Rent this property</DialogTitle>
          <div className="flex flex-row justify-center"></div>
          <div className="flex flex-row justify-center"></div>
          <DialogDescription />
        </DialogHeader>

        <div className="w-full flex flex-col gap-5">
          <Command
            className={`border ${results.length > 0 || showNoResults ? 'min-h-25' : 'min-h-10'} max-h-1/2`}
          >
            <CommandInput
              placeholder="Search tenant by email..."
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              {isLoading && <div className="p-2 text-muted">Loading...</div>}
              {!isLoading && showNoResults ? (
                <CommandEmpty className="h-full flex flex-col items-center justify-center mt-2">
                  No tenants found.
                  <div className="font-light text-sm">
                    Invite
                    <Button
                      variant="link"
                      className="h-5 text-blue-600 cursor-pointer px-1"
                    >
                      "{query}"
                    </Button>
                    as a tenant
                  </div>
                </CommandEmpty>
              ) : null}
              {results &&
                results.map((tenant) => (
                  <CommandItem
                    key={tenant.id}
                    value={tenant.email}
                    onSelect={() => {
                      const selectedUser: User = {
                        id: tenant.id,
                        email: tenant.email,
                        firstName: tenant.firstName,
                        lastName: tenant.lastName,
                        role: tenant.role,
                      };
                      setSelectedTenant(selectedUser);
                    }}
                  >
                    <div className="flex flex-row gap-5 justify-center">
                      <span className="font-bold">{tenant.email}</span>
                      <div className=" text-sm">
                        {tenant.firstName} {tenant.lastName}
                      </div>
                    </div>
                  </CommandItem>
                ))}
            </CommandList>
          </Command>

          {selectedTenant && (
            <Form {...form}>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <div className="flex flex-col gap-5">
                  <div className="w-full flex flex-row gap-5">
                    <div className="w-full flex flex-col gap-2">
                      <Label>Tenant's Email</Label>
                      <Input
                        value={selectedTenant.email}
                        disabled={true}
                        className="border text-center disabled:text-black disabled:opacity-100 disabled:bg-gray-100"
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <Label>Tenant's Name</Label>
                      <Input
                        value={`${selectedTenant.firstName} ${selectedTenant.lastName}`}
                        disabled={true}
                        className="border text-center disabled:text-black disabled:opacity-100  disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  <div className=" w-full flex flex-row gap-5">
                    {(
                      [
                        ['startDate', 'Starting Date'],
                        ['endDate', 'Ending Date'],
                      ] as const
                    ).map(([field, label], index) => (
                      <FormField
                        key={index}
                        control={form.control}
                        name={field}
                        render={({ field, fieldState }) => (
                          <FormItem className="w-full">
                            <FormLabel>{label}</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={'outline'}
                                  className={` ${fieldState.error ? 'border-red-500' : ''}`}
                                >
                                  {field.value ? (
                                    format(field.value, 'PPP')
                                  ) : (
                                    <span className="text-gray-500">
                                      Pick a date
                                    </span>
                                  )}
                                  <CalendarIcon
                                    className="mr-2 h-4 w-4"
                                    color="grey"
                                  />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                />
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              </form>
            </Form>
          )}
        </div>
        <DialogFooter>
          <Button onClick={() => form.handleSubmit(handleOnSubmit)()}>
            Create the rent
          </Button>
        </DialogFooter>
      </DialogContent>
      {/* </form>
      </Form> */}
    </Dialog>
  );
};

export default RentPropertyForm;
