'use client';

import { useAuth } from '../../../../../../../hooks/useAuth';
import { useProperty } from '../../../../../../../hooks/useProperty';
import { PropertyStatus } from '../../../../../../../types/property';
import IssuesContent from './issues-container';
import PaymentsContainer from './payments-container';
import PropertyDetailContainer from './property-detail';
import { Card, CardContent } from '@/components/ui/card';

const ParentContainer = ({ id }: { id: string }) => {
  const { accessToken } = useAuth();
  const { property, isLoading } = useProperty(accessToken, id);

  if (isLoading) {
    return (
      <Card className="flex flex-col">
        <CardContent></CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <PropertyDetailContainer property={property} isLoading={isLoading} />

      <div className="grid grid-cols-2 gap-5 ">
        {property && property.status === PropertyStatus.RENTED && (
          <PaymentsContainer propertyId={id} />
        )}
        {property && property.status === PropertyStatus.RENTED && (
          <div>
            <IssuesContent propertyId={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentContainer;
