'use client';

import { useAuth } from '../../../../../hooks/useAuth';
import { useCurrentTenantsPayments } from '../../../../../hooks/usePayment';
import { useTenantsResidence } from '../../../../../hooks/useProperty';
import PaymentsContainer from '../../../../../components/custom/payments-container';
import PropertyDetailContainer from '../../../../../components/custom/property-detail';
import NextPayment from './next-payment';
import IssuesContent from '../../../../../components/custom/issues-container';
import { Rabbit } from 'lucide-react';
import RentalPropertyAlert from './rental-alert';
import { usePendingPropertyBooking } from '../../../../../hooks/useBooking';
import { MaintenanceContextProvider } from '../../../../../contexts/maintenance-context';

const ParentContainer = () => {
  const { accessToken } = useAuth();
  const { tenantsResidence, loadProperty, isLoading } =
    useTenantsResidence(accessToken);
  const { pendingPropertyBooking } = usePendingPropertyBooking(accessToken);

  const { payments } = useCurrentTenantsPayments(
    accessToken,
    tenantsResidence?.id,
  );

  if (!tenantsResidence) {
    return (
      <div
        className={`h-100 flex flex-col ${pendingPropertyBooking ? 'gap-20' : ' items-center justify-center'}`}
      >
        {pendingPropertyBooking && (
          <RentalPropertyAlert
            pendingPropertyBooking={pendingPropertyBooking}
            loadProperty={loadProperty}
          />
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
            <MaintenanceContextProvider propertyId={tenantsResidence?.id}>
              <IssuesContent
                propertyId={tenantsResidence?.id}
                isTenant={true}
              />
            </MaintenanceContextProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentContainer;
