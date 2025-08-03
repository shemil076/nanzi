'use client';

import { useAuth } from '../../../../../hooks/useAuth';
import { useCurrentTenantsPayments } from '../../../../../hooks/usePayment';
import { useTenantsResidence } from '../../../../../hooks/useProperty';
import PaymentsContainer from '../../../../../components/custom/payments-container';
import PropertyDetailContainer from '../../../../../components/custom/property-detail';
import NextPayment from './next-payment';

const ParentContainer = () => {
  const { accessToken } = useAuth();
  const { tenantsResidence, loadProperty, isLoading } =
    useTenantsResidence(accessToken);

  const { payments } = useCurrentTenantsPayments(
    accessToken,
    tenantsResidence?.id,
  );
  return (
    <div className="flex flex-col gap-5 ">
      <PropertyDetailContainer
        property={tenantsResidence}
        isLoading={isLoading}
        loadProperty={loadProperty}
        isTenant={true}
      />

      <div className="grid grid-cols-2 gap-5">
        <PaymentsContainer payments={payments} />
        <div className="grid grid-cols-1 gap-5">
          <div>
            <NextPayment
              propertyId={tenantsResidence?.id}
              monthlyRent={tenantsResidence?.price}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentContainer;
