'use client';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Property,
  PropertyIcon,
  PropertyStatusLabels,
  PropertyStatusVariant,
  PropertyType,
} from '@/types/property';
import { Skeleton } from '@/components/ui/skeleton';
import { formatPrice } from '@/lib/utils/helperFunctions';
import { Badge } from '@/components/ui/badge';
import { LandSizeUnit } from '../../../../../../../types/property';
import UpdatePropertyDialog from './update-property-dialog';
import { useDeleteProperty } from '../../../../../../../hooks/useProperty';
import DeleteDialog from '../../../../../../../components/custom/delete-dialog';
import { useAuth } from '../../../../../../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CircleCheckBig, XCircle } from 'lucide-react';

interface PropertyDetailContainerProps {
  property: Property;
  isLoading: boolean;
  loadProperty: () => Promise<void>;
}

const PropertyDetailContainer = ({
  property,
  isLoading,
  loadProperty,
}: PropertyDetailContainerProps) => {
  const { accessToken } = useAuth();
  const IconComponent = property && PropertyIcon[property.propertyType];
  const router = useRouter();

  const { deleteProperty } = useDeleteProperty();

  const handleOnDelete = async () => {
    const { id } = property;
    if (!id) return;

    try {
      const { success } = await deleteProperty(id, accessToken);

      const message = success
        ? 'Successfully deleted the property'
        : 'Failed to delete the property';

      const icon = success ? (
        <CircleCheckBig className="text-green-500" />
      ) : (
        <XCircle className="text-red-500" />
      );

      const toastClass = 'flex items-center justify-center gap-5';

      toast(message, { icon, className: toastClass });

      if (success) {
        router.push('/dashboard/landlord/properties');
      }
    } catch (error) {
      toast('An unexpected error occurred', {
        icon: <XCircle className="text-red-500" />,
        className: 'flex items-center justify-center gap-5',
      });
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <Card className="flex flex-row h-[200px] items-center justify-center">
        <CardContent className="flex flex-col gap-3 ">
          <Skeleton className="h-[50px] w-[500px] rounded-2xl" />
          <Skeleton className="h-[20px] w-[500px] rounded-2xl" />
          <Skeleton className="h-[20px] w-[300px] rounded-2xl" />
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="gap-0">
      {property ? (
        <>
          <CardHeader className=" flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <IconComponent size={20} />
              <span className="text-2xl font-bold">{property.title}</span>

              <Badge variant={PropertyStatusVariant[property.status]}>
                {PropertyStatusLabels[property.status]}
              </Badge>
            </div>
            <div className="flex flex-row items-center gap-5">
              <UpdatePropertyDialog
                property={property}
                loadProperty={loadProperty}
              />
              <DeleteDialog
                id={property.id}
                handleDeactivate={handleOnDelete}
                variant="outline"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2">
              <div>
                <span className="text-sm text-gray-500">
                  {property.address}
                </span>

                {(property.propertyType === PropertyType.APARTMENT ||
                  property.propertyType === PropertyType.HOUSE) && (
                  <div className="grid grid-cols-2 text-sm text-gray-500 font-semibold gap-2 my-3">
                    <div>
                      Bed rooms{': '}
                      <span className="text-black">
                        {property.numberOfBeds}
                      </span>
                    </div>
                    <div>
                      Bath rooms{': '}
                      <span className="text-black">
                        {property.numberOfBaths}
                      </span>
                    </div>
                    <div>
                      Area{': '}
                      <span className="text-black">
                        {property.houseSize} sq ft
                      </span>
                    </div>
                    <div>
                      Monthly Rent{': '}
                      <span className="text-green-600">
                        {formatPrice(property.price)}
                      </span>
                    </div>
                  </div>
                )}

                {property.landSize ? (
                  <div className=" text-sm text-gray-500 font-semibold gap-2 my-3">
                    <div>
                      Land Size{': '}
                      <span className="text-black">
                        {property.landSize}{' '}
                        {LandSizeUnit[property.landSizeUnit]}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* TODO: Implement to show the images */}
              <div className="mt-5 flex flex-col gap-4">
                <Skeleton className="h-[50px] w-[500px] rounded-2xl" />
                <Skeleton className="h-[20px] w-[500px] rounded-2xl" />
                <Skeleton className="h-[20px] w-[300px] rounded-2xl" />
              </div>
            </div>
          </CardContent>
        </>
      ) : (
        <Skeleton className="h-[20px] w-[100px] rounded-full" />
      )}
    </Card>
  );
};

export default PropertyDetailContainer;
