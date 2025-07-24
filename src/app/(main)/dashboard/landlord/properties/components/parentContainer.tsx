'use client';
import { Card, CardHeader } from '../../../../../../components/ui/card';
import { useAuth } from '../../../../../../hooks/aueAuth';
import { useProperties } from '../../../../../../hooks/userProperty';
import AddPropertyDialog from './addpropertyDialog';
import PropertiesTable from './data-table';

const ParentContainer = () => {
  const { accessToken } = useAuth();
  const { properties, loadProperties } = useProperties(accessToken);
  return (
    <Card>
      <CardHeader className="flex flex-col gap-5 ">
        <div className="w-full flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold">Onboarded Properties</span>
            <span className="text-sm text-gray-500">
              Manage your rental properties
            </span>
          </div>
          <div>
            <AddPropertyDialog loadProperties={loadProperties} />
          </div>
        </div>
        <div className="w-full">
          <PropertiesTable data={properties} />
        </div>
      </CardHeader>
    </Card>
  );
};

export default ParentContainer;
