import { CircleCheckBig, XCircle } from 'lucide-react';
import { Badge } from '../../../../../components/ui/badge';
import { Button } from '../../../../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
} from '../../../../../components/ui/card';
import { useAuth } from '../../../../../hooks/useAuth';
import { useApproveBooking } from '../../../../../hooks/useBooking';
import { BookingWithPropertyInfo } from '../../../../../types/booking';
import { toast } from 'sonner';

interface RentalPropertyAlertProps {
  pendingPropertyBooking: BookingWithPropertyInfo;
  loadProperty: () => Promise<void>;
}

const RentalPropertyAlert = ({
  pendingPropertyBooking,
  loadProperty,
}: RentalPropertyAlertProps) => {
  const { accessToken } = useAuth();
  const { approveBooking } = useApproveBooking();

  const handleOnSubmit = async () => {
    const { success } = await approveBooking(
      pendingPropertyBooking.id,
      accessToken,
    );

    if (!success) {
      toast('Failed to approve the booking', {
        icon: <XCircle className="text-red-500" />,
        className: 'flex items-center justify-center space-x-2',
      });
    } else {
      toast('Successfully approved the booking', {
        icon: <CircleCheckBig className="text-green-500" />,
        className: 'flex items-center justify-center gap-5',
      });

      loadProperty();
    }
  };
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
        <Button className="h-full text-2xl" onClick={handleOnSubmit}>
          Occupy
        </Button>
      </CardContent>
    </Card>
  );
};

export default RentalPropertyAlert;
