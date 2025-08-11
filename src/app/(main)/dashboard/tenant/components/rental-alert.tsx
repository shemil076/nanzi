import { Badge } from '../../../../../components/ui/badge';
import { Button } from '../../../../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
} from '../../../../../components/ui/card';
import { BookingWithPropertyInfo } from '../../../../../types/booking';

const RentalPropertyAlert = ({
  pendingPropertyBooking,
}: {
  pendingPropertyBooking: BookingWithPropertyInfo;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row ">
        <Badge className="text-xl font-semibold" variant="destructive">
          Property rental alert
        </Badge>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold">
            The landlord has added you as his tenant to his property.
          </div>
          <div className="flex flex-row items-center gap-10 text-gray-500">
            <div className="text-lg font-bold">
              {pendingPropertyBooking.property.title}
            </div>
            <div> {pendingPropertyBooking.property.address}</div>
          </div>
        </div>
        <Button className="h-full text-2xl"> Occupy</Button>
      </CardContent>
    </Card>
  );
};

export default RentalPropertyAlert;
