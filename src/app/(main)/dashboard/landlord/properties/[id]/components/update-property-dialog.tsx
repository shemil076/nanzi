'use client';

import { CircleCheckBig, Pencil, XCircle } from 'lucide-react';
import { Button } from '../../../../../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../../../../components/ui/dialog';
import { useState } from 'react';
import z from 'zod';
import {
  LandSizeUnit,
  LandSizeUnitLabels,
  Property,
  PropertyType,
  UpdateProperty,
} from '../../../../../../../types/property';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '../../../../../../../components/ui/input';
import { Textarea } from '../../../../../../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../../../components/ui/select';
import { useUpdateProperty } from '../../../../../../../hooks/useProperty';
import { useAuth } from '../../../../../../../hooks/useAuth';
import { toast } from 'sonner';

const propertyUpdateForm = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long'),
  description: z.string().nonempty(),
  address: z.string().nonempty(),
  price: z.coerce.number().min(1),

  numberOfBeds: z.coerce.number().optional(),
  numberOfBaths: z.coerce.number().optional(),
  landSize: z.coerce.number().optional(),
  landSizeUnit: z.string().optional(),
  houseSize: z.coerce.number().optional(),

  isFurnished: z.boolean().optional(),
  apartmentComplex: z.string().optional(),
});

interface UpdatePropertyDialogProps {
  property: Property;
  loadProperty: () => Promise<void>;
}

const UpdatePropertyDialog = ({
  property,

  loadProperty,
}: UpdatePropertyDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { updateProperty } = useUpdateProperty();
  const { accessToken } = useAuth();

  const defaultValues = {
    title: property.title || '',
    description: property.description || '',
    address: property.address || '',
    price: property.price || 0,
    numberOfBeds: property.numberOfBeds || 0,
    numberOfBaths: property.numberOfBaths || 0,
    houseSize: property.houseSize || 0,
    landSize: property.landSize || 0,
    landSizeUnit: property.landSizeUnit || LandSizeUnit.PERCHES,
    isFurnished: property.isFurnished || false,
    apartmentComplex: property.apartmentComplex || '',
  };

  const updateForm = useForm<z.infer<typeof propertyUpdateForm>>({
    resolver: zodResolver(propertyUpdateForm),
    defaultValues,
  });

  const handleOnCancel = () => {
    setIsOpen(false);
    updateForm.reset();
  };

  const handleOnSubmit = async (values: z.infer<typeof propertyUpdateForm>) => {
    if (!values) return;

    const baseFields = {
      title: values.title,
      description: values.description,
      address: values.address,
      price: values.price,
    };

    let updatedProperty: UpdateProperty;

    switch (property.propertyType) {
      case PropertyType.HOUSE:
        updatedProperty = {
          ...baseFields,
          numberOfBeds: values.numberOfBeds,
          numberOfBaths: values.numberOfBaths,
          houseSize: values.houseSize,
          isFurnished: values.isFurnished,
          landSize: values.landSize,
          landSizeUnit: values.landSizeUnit,
        };
        break;

      case PropertyType.APARTMENT:
        updatedProperty = {
          ...baseFields,
          numberOfBeds: values.numberOfBeds,
          numberOfBaths: values.numberOfBaths,
          houseSize: values.houseSize,
          isFurnished: values.isFurnished,
          apartmentComplex: values.apartmentComplex,
        };
        break;

      case PropertyType.LAND:
      case PropertyType.COMMERCIAL:
        updatedProperty = {
          ...baseFields,
          landSize: values.landSize,
          landSizeUnit: values.landSizeUnit,
        };
        break;

      default:
        toast('Unsupported property type', {
          icon: <XCircle className="text-red-500" />,
          className: 'flex items-center justify-center gap-5',
        });
        return;
    }

    try {
      const { success } = await updateProperty(
        property.id,
        updatedProperty,
        accessToken,
      );

      const message = success
        ? 'Successfully updated the details'
        : 'Failed to update the details';

      const icon = success ? (
        <CircleCheckBig className="text-green-500" />
      ) : (
        <XCircle className="text-red-500" />
      );

      toast(message, {
        icon,
        className: 'flex items-center justify-center gap-5',
      });

      if (success) {
        setIsOpen(false);
        updateForm.reset();
        loadProperty();
      }
    } catch (error) {
      toast('An unexpected error occurred', {
        icon: <XCircle className="text-red-500" />,
        className: 'flex items-center justify-center gap-5',
      });
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className=" flex gap-3 items-center">
          <Pencil />
          Update
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-full sm:max-w-[700px]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Update property</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <Form {...updateForm}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-2 gap-3">
              {[
                ['title', 'Title'],
                ['address', 'Address'],
                ['price', 'Price'],
              ].map(([name, label]) => (
                <FormField
                  key={name}
                  control={updateForm.control}
                  name={name as keyof typeof defaultValues}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input className="text-center" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}

              {property.propertyType !== PropertyType.COMMERCIAL &&
                property.propertyType !== PropertyType.LAND &&
                [
                  ['numberOfBeds', 'Beds'],
                  ['numberOfBaths', 'Baths'],
                  ['houseSize', 'House Size (sqft)'],
                ].map(([name, label]) => (
                  <FormField
                    key={name}
                    control={updateForm.control}
                    name={name as keyof typeof defaultValues}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          <Input className="text-center" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}

              {property.propertyType !== PropertyType.COMMERCIAL &&
                property.propertyType !== PropertyType.LAND && (
                  <FormField
                    control={updateForm.control}
                    name="isFurnished"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Is Furnished</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(val) =>
                              field.onChange(val === 'true')
                            }
                            value={String(field.value)}
                          >
                            <SelectTrigger className="text-center">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Yes</SelectItem>
                              <SelectItem value="false">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
            </div>

            {property.propertyType !== PropertyType.APARTMENT && (
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={updateForm.control}
                  name="landSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Land Size</FormLabel>
                      <FormControl>
                        <Input className="text-center" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={updateForm.control}
                  name="landSizeUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Land Size Unit</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="text-center">
                            <SelectValue placeholder="Select Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(LandSizeUnit).map((unit) => (
                              <SelectItem key={unit} value={unit}>
                                {LandSizeUnitLabels[unit]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={updateForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="text-center" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {property.propertyType === PropertyType.APARTMENT && (
              <FormField
                control={updateForm.control}
                name="apartmentComplex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apartment Complex</FormLabel>
                    <FormControl>
                      <Input className="text-center" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <DialogFooter className="mt-5">
              <div className="flex gap-5">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleOnCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={() => updateForm.handleSubmit(handleOnSubmit)()}
                >
                  Update
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default UpdatePropertyDialog;
