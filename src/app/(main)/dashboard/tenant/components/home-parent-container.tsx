'use client';

import { useAuth } from '../../../../../hooks/useAuth';
import { useCurrentTenantsPayments } from '../../../../../hooks/usePayment';
import {
  usePropertyToOccupy,
  useTenantsResidence,
} from '../../../../../hooks/useProperty';
import PaymentsContainer from '../../../../../components/custom/payments-container';
import PropertyDetailContainer from '../../../../../components/custom/property-detail';
import NextPayment from './next-payment';
import IssuesContent from '../../../../../components/custom/issues-container';
import { Rabbit } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
} from '../../../../../components/ui/card';
import { Badge } from '../../../../../components/ui/badge';
import { Button } from '../../../../../components/ui/button';

const ParentContainer = () => {
  const { accessToken } = useAuth();
  const { tenantsResidence, loadProperty, isLoading } =
    useTenantsResidence(accessToken);
  const { propertyToOccupy } = usePropertyToOccupy(accessToken);

  const { payments } = useCurrentTenantsPayments(
    accessToken,
    tenantsResidence?.id,
  );

  if (!tenantsResidence) {
    return (
      <div
        className={`h-100 flex flex-col ${propertyToOccupy ? 'gap-20' : ' items-center justify-center'}`}
      >
        {propertyToOccupy && (
          <Card>
            <CardHeader className="flex flex-row ">
              <Badge className="text-xl font-semibold" variant="destructive">
                Property rental alert
              </Badge>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div>
                The landlord has added you as his tenant to his property.
              </div>

              <div className="flex flex-row items-center gap-10">
                <div className="text-lg font-bold">
                  {propertyToOccupy.title}
                </div>
                <div>{propertyToOccupy.address}</div>
              </div>

              <Button>Occupy</Button>
            </CardContent>
          </Card>
        )}
        <div className="flex flex-col text-center items-center justify-center">
          <Rabbit color="gray" size={80} />
          <div className="text-3xl font-bold text-gray-500">Unfortunately,</div>
          <div className="font-semibold text-gray-500">
            You do not currently occupy a property.
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5 ">
      <PropertyDetailContainer
        property={tenantsResidence}
        isLoading={isLoading}
        loadProperty={loadProperty}
        isTenant={true}
      />

      <div className="grid grid-cols-2 gap-5">
        <div>
          <PaymentsContainer payments={payments} />
        </div>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <NextPayment monthlyRent={tenantsResidence?.price} />
          </div>
          <div>
            <IssuesContent propertyId={tenantsResidence?.id} isTenant={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentContainer;
