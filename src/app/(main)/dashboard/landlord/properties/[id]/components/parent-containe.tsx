'use client';

import { useAuth } from '../../../../../../../hooks/useAuth';
import { usePaymentsByProperty } from '../../../../../../../hooks/usePayment';
import { useProperty } from '../../../../../../../hooks/useProperty';
import { PropertyStatus } from '../../../../../../../types/property';
import PaymentsContainer from '../../../../../../../components/custom/payments-container';
import PropertyDetailContainer from '../../../../../../../components/custom/property-detail';
import { Card, CardContent } from '@/components/ui/card';
import IssuesContent from '../../../../../../../components/custom/issues-container';

const ParentContainer = ({ id }: { id: string }) => {
  const { accessToken } = useAuth();
  const { property, isLoading, loadProperty } = useProperty(accessToken, id);
  const { payments } = usePaymentsByProperty(accessToken, property?.id);

  if (isLoading) {
    return (
      <Card className="flex flex-col">
        <CardContent></CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <PropertyDetailContainer
        property={property}
        isLoading={isLoading}
        loadProperty={loadProperty}
      />

      <div className="grid grid-cols-2 gap-5 ">
        {property && property.status === PropertyStatus.RENTED && (
          <div>
            <PaymentsContainer payments={payments} />
          </div>
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
