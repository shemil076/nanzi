/* eslint-disable react-hooks/exhaustive-deps */
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
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CircleCheckBig, HousePlus, XCircle } from 'lucide-react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  LandSizeUnit,
  LandSizeUnitLabels,
  PropertyType,
  PropertyLabels,
  NewProperty,
} from '@/types/property';
import StatusBar from './status-bar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateProperty } from '@/hooks/userProperty';
import { useAuth } from '@/hooks/aueAuth';
import { toast } from 'sonner';

const propertyForm = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long'),
  description: z.string().nonempty(),
  address: z.string().nonempty(),
  price: z.coerce.number().min(1),
  propertyType: z.nativeEnum(PropertyType),

  numberOfBeds: z.coerce.number().optional(),
  numberOfBaths: z.coerce.number().optional(),
  landSize: z.coerce.number().optional(),
  landSizeUnit: z.string().optional(),
  houseSize: z.coerce.number().optional(),

  isFurnished: z.boolean().optional(),
  apartmentComplex: z.string().optional(),
});

type PropertyFormData = z.infer<typeof propertyForm>;

interface AddPropertyDialogProps {
  loadProperties: () => Promise<void>;
}

const AddPropertyDialog = ({ loadProperties }: AddPropertyDialogProps) => {
  const { user, accessToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<number>(1);

  const { addProperty } = useCreateProperty();

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertyForm),
    defaultValues: {
      title: '',
      description: '',
      address: '',
      price: 0,
      propertyType: PropertyType.HOUSE,
      numberOfBeds: 0,
      numberOfBaths: 0,
      houseSize: 0,
      landSize: 0,
      landSizeUnit: LandSizeUnit.PERCHES,
      isFurnished: false,
      apartmentComplex: '',
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      form.reset();
    }
  }, [isOpen]);

  const handleOnSubmit = async (values: z.infer<typeof propertyForm>) => {
    if (values) {
      let newProperty: NewProperty;
      if (form.watch('propertyType') === PropertyType.HOUSE) {
        newProperty = {
          title: values.title,
          description: values.description,
          address: values.address,
          price: values.price,
          landlordId: user.id,
          propertyType: values.propertyType,

          numberOfBeds: values.numberOfBeds,
          numberOfBaths: values.numberOfBaths,
          houseSize: values.houseSize,
          isFurnished: values.isFurnished,
          landSize: values.landSize,
          landSizeUnit: values.landSizeUnit,
        };
      }

      if (form.watch('propertyType') === PropertyType.APARTMENT) {
        newProperty = {
          title: values.title,
          description: values.description,
          address: values.address,
          price: values.price,
          landlordId: user.id,
          propertyType: values.propertyType,

          numberOfBeds: values.numberOfBeds,
          numberOfBaths: values.numberOfBaths,
          houseSize: values.houseSize,
          isFurnished: values.isFurnished,
          apartmentComplex: values.apartmentComplex,
        };
      }

      if (
        form.watch('propertyType') === PropertyType.LAND ||
        form.watch('propertyType') === PropertyType.COMMERCIAL
      ) {
        newProperty = {
          title: values.title,
          description: values.description,
          address: values.address,
          price: values.price,
          landlordId: user.id,
          propertyType: values.propertyType,

          landSize: values.landSize,
          landSizeUnit: values.landSizeUnit,
        };
      }

      const { success } = await addProperty(newProperty, accessToken);

      if (!success) {
        toast('Failed to create', {
          icon: <XCircle className="text-red-500" />,
          className: 'flex items-center justify-center space-x-2',
        });
      } else {
        toast('Successfully created', {
          icon: <CircleCheckBig className="text-green-500" />,
          className: 'flex items-center justify-center gap-5',
        });

        setIsOpen(false);
        form.reset();
        setStep(1);

        loadProperties();
      }
    }
  };

  const getStepFields = (step: number): (keyof PropertyFormData)[] => {
    if (step === 1) {
      return ['title', 'description', 'propertyType', 'price', 'address'];
    }
    if (step === 2) {
      if (form.watch('propertyType') === PropertyType.APARTMENT) {
        return [
          'numberOfBaths',
          'numberOfBeds',
          'houseSize',
          'isFurnished',
          'apartmentComplex',
        ];
      }

      if (form.watch('propertyType') === PropertyType.HOUSE) {
        return [
          'numberOfBaths',
          'numberOfBeds',
          'houseSize',
          'isFurnished',
          'landSize',
          'landSizeUnit',
        ];
      }

      if (
        form.watch('propertyType') === PropertyType.LAND ||
        form.watch('propertyType') === PropertyType.COMMERCIAL
      ) {
        return ['landSize', 'landSizeUnit'];
      }
      return [];
    }
    return [];
  };

  const nextStep = async () => {
    const isStepValid = await form.trigger(getStepFields(step));
    if (isStepValid) {
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => setStep((s) => s - 1);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <div className="flex flex-row justify-center items-center gap-3">
            <HousePlus size={20} />
            Add a property
          </div>
        </Button>
      </DialogTrigger>

      <Form {...form}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <DialogContent
            className="w-full sm:max-w-[00px] md:max-w-[900px]"
            onPointerDownOutside={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>Add a new property</DialogTitle>
              <div className="flex flex-row justify-center">
                <StatusBar selectedStep={step} />
              </div>
              <div className="flex flex-row justify-center"></div>
              <DialogDescription />
            </DialogHeader>

            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          className="border text-center disabled:text-black disabled:opacity-100"
                          {...field}
                          placeholder="ex: Spacious 2-Bedroom Apartment in Downtown Colombo"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="border text-center disabled:text-black disabled:opacity-100"
                          {...field}
                          placeholder="Description about the property"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="w-full flex flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field, fieldState }) => (
                      <FormItem className="w-full">
                        <FormLabel>Property Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={`w-full justify-center border text-center disabled:text-black disabled:opacity-100 ${fieldState.error ? 'border-red-500' : ''}`}
                          >
                            <SelectValue placeholder="Select brand" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(PropertyType).map((type) => (
                              <SelectItem key={type} value={type}>
                                {PropertyLabels[type]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Price (LKR)</FormLabel>
                        <FormControl>
                          <Input
                            className="border text-center placeholder:text-gray-500 disabled:text-black disabled:opacity-100"
                            {...field}
                            placeholder="0"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          className="border text-center disabled:text-black disabled:opacity-100"
                          {...field}
                          placeholder="ex: No: 1/a Main street Downtown Colombo"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 2 && (
              <>
                {form.watch('propertyType') != PropertyType.COMMERCIAL &&
                  form.watch('propertyType') != PropertyType.LAND && (
                    <>
                      <div className="w-full flex flex-row gap-4">
                        <FormField
                          control={form.control}
                          name="numberOfBeds"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Number of Beds</FormLabel>
                              <FormControl>
                                <Input
                                  className="border text-center placeholder:text-gray-500 disabled:text-black disabled:opacity-100"
                                  {...field}
                                  placeholder="0"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="numberOfBaths"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Number of Baths</FormLabel>
                              <FormControl>
                                <Input
                                  className="border text-center placeholder:text-gray-500 disabled:text-black disabled:opacity-100"
                                  {...field}
                                  placeholder="0"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="w-full flex flex-row gap-4">
                        <FormField
                          control={form.control}
                          name="houseSize"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Size (in square feet)</FormLabel>
                              <FormControl>
                                <Input
                                  className="border text-center placeholder:text-gray-500 disabled:text-black disabled:opacity-100"
                                  {...field}
                                  placeholder="0"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="isFurnished"
                          render={({ field, fieldState }) => (
                            <FormItem className="w-full">
                              <FormLabel>Is Furnished</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={(value) =>
                                    field.onChange(value == 'true')
                                  }
                                  defaultValue={field.value?.toString()}
                                  value={
                                    field.value !== null &&
                                    field.value !== undefined
                                      ? field.value.toString()
                                      : ''
                                  }
                                >
                                  <SelectTrigger
                                    className={`w-full justify-center border text-center disabled:text-black disabled:opacity-100 ${fieldState.error ? 'border-red-500' : ''}`}
                                  >
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value={'true'}>Yes</SelectItem>
                                    <SelectItem value={'false'}>No</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </>
                  )}

                {form.watch('propertyType') !== PropertyType.APARTMENT && (
                  <div className="w-full flex flex-row gap-4">
                    <FormField
                      control={form.control}
                      name="landSize"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Land size</FormLabel>
                          <FormControl>
                            <Input
                              className="border text-center placeholder:text-gray-500 disabled:text-black disabled:opacity-100"
                              {...field}
                              placeholder="0"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="landSizeUnit"
                      render={({ field, fieldState }) => (
                        <FormItem className="w-full">
                          <FormLabel>Land Size Unit</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <SelectTrigger
                              className={`w-full justify-center border text-center disabled:text-black disabled:opacity-100 ${fieldState.error ? 'border-red-500' : ''}`}
                            >
                              <SelectValue placeholder="Select the Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.values(LandSizeUnit).map((type) => (
                                <SelectItem key={type} value={type}>
                                  {LandSizeUnitLabels[type]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {form.watch('propertyType') === PropertyType.APARTMENT && (
                  <FormField
                    control={form.control}
                    name="apartmentComplex"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apartment Complex</FormLabel>
                        <FormControl>
                          <Input
                            className="border text-center disabled:text-black disabled:opacity-100"
                            {...field}
                            placeholder="ex:2000 Plaza residencies"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </>
            )}

            <DialogFooter>
              <div className="flex justify-between gap-5 ">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                )}
                {step < 2 && (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                )}
                {step === 2 && (
                  <Button
                    type="submit"
                    onClick={() => form.handleSubmit(handleOnSubmit)()}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};
export default AddPropertyDialog;
