import { Card, CardHeader } from '../../../../../../components/ui/card';
import AddPropertyDialog from './addpropertyDialog';

const ParentContainer = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row-reverse">
        <AddPropertyDialog />
      </CardHeader>
    </Card>
  );
};

export default ParentContainer;
