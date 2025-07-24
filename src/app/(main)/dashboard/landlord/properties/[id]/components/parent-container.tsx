'use client';

import { useAuth } from '../../../../../../../hooks/aueAuth';
import { useProperty } from '../../../../../../../hooks/userProperty';
import PropertyDetailContainer from './property-detail';
import { Card, CardContent } from '@/components/ui/card';

const ParentContainer = ({ id }: { id: string }) => {
  const { accessToken } = useAuth();
  const { property, loadProperty, isLoading, error } = useProperty(
    accessToken,
    id,
  );

  if (isLoading) {
    return (
      <Card className="flex flex-col">
        <CardContent></CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col">
      <PropertyDetailContainer property={property} isLoading={isLoading} />
    </div>
  );
};

export default ParentContainer;
