'use client';
import { BadgeAlert, Building, DollarSign, UsersRound } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
} from '../../../../../components/ui/card';
import { useAuth } from '../../../../../hooks/useAuth';
import { usePropertiesOVerview } from '../../../../../hooks/useProperty';
import { formatPrice } from '../../../../../lib/utils/helperFunctions';

const PropertyOverViewHeader = () => {
  const { accessToken } = useAuth();
  const { propertiesOverview } = usePropertiesOVerview(accessToken);
  return (
    <div className="grid grid-cols-4 gap-5">
      <>
        {propertiesOverview &&
          [
            {
              field: 'Active Properties',
              icon: Building,
              value: `${propertiesOverview.availablePropertyCount + propertiesOverview.rentedPropertyCount}`,
              subtitle: `${propertiesOverview.tenantCount} occupied, ${propertiesOverview.availablePropertyCount} vacant`,
            },
            {
              field: 'Active Tenants',
              icon: UsersRound,
              value: `${propertiesOverview.tenantCount}`,
              subtitle: ``,
            },
            {
              field: 'Monthly Revenue',
              icon: DollarSign,
              value: `${formatPrice(propertiesOverview.monthlyRevenue)}`,
              subtitle: ``,
            },
            {
              field: 'Pending Issues',
              icon: BadgeAlert,
              value: `${propertiesOverview.highPriorityIssues + propertiesOverview.mediumPriorityIssues + propertiesOverview.lowPriorityIssues}`,
              subtitle: `Includes ${propertiesOverview.highPriorityIssues} High priority ${propertiesOverview.highPriorityIssues <= 1 ? 'task' : 'tasks'}`,
            },
          ].map((item, index) => (
            <Card key={index} className="gap-2">
              <CardHeader className="flex flex-row justify-between">
                <div className="font-semibold">{item.field}</div>
                <item.icon size={18} color="gray" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold"> {item.value}</div>

                <div className="text-sm  text-gray-500">{item.subtitle}</div>
              </CardContent>
            </Card>
          ))}
      </>
    </div>
  );
};
export default PropertyOverViewHeader;
