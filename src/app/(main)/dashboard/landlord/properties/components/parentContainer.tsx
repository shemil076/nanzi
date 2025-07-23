'use client';
import { Card, CardHeader } from '../../../../../../components/ui/card';
import { useAuth } from '../../../../../../hooks/aueAuth';
import { useProperties } from '../../../../../../hooks/userProperty';
import AddPropertyDialog from './addpropertyDialog';
import PropertiesTable from './data-table';

const ParentContainer = () => {
  const { accessToken } = useAuth();
  const { properties } = useProperties(accessToken);
  return (
    <Card>
      <CardHeader className="flex flex-col">
        <div className="w-full flex flex-row justify-end">
          <AddPropertyDialog />
        </div>
        <div className="w-full">
          <PropertiesTable data={properties} />
        </div>
      </CardHeader>
    </Card>
  );
};

export default ParentContainer;
