import { Badge } from '../../../../../components/ui/badge';
import { Button } from '../../../../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
} from '../../../../../components/ui/card';
import { Property } from '../../../../../types/property';

const RentalPropertyAlert = ({
  propertyToOccupy,
}: {
  propertyToOccupy: Property;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row ">
        <Badge className="text-xl font-semibold" variant="destructive">
          Property rental alert
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div>The landlord has added you as his tenant to his property.</div>

        <div className="flex flex-row items-center gap-10">
          <div className="text-lg font-bold">{propertyToOccupy.title}</div>
          <div>{propertyToOccupy.address}</div>
        </div>

        <Button>Occupy</Button>
      </CardContent>
    </Card>
  );
};

export default RentalPropertyAlert;
