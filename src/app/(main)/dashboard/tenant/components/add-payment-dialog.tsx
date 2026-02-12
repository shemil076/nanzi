import { Button } from '../../../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../../components/ui/dialog';
import { CreditCard } from 'lucide-react';
import { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../../components/ui/tabs';
import { Payment } from '../../../../../types/payment';

export function AddPaymentDialog({
  currentPayment,
}: {
  currentPayment: Payment;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex flex-row w-full items-center">
          <CreditCard />
          <span>Add payment</span>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-full sm:max-w-[00px] md:max-w-[900px]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>New Payment</DialogTitle>
          <div className="flex flex-row justify-center"></div>
          <DialogDescription />
        </DialogHeader>

        <Tabs defaultValue="full-payment">
          <TabsList>
            <TabsTrigger value="full-payment">Pay the Full Amount</TabsTrigger>
            <TabsTrigger value="installments">Pay as Installments</TabsTrigger>
          </TabsList>
          <TabsContent value="full-payment">
            <div className="flex flex-col p-5 text-2xl font-bold">
              <div>
                Total Amount to pay:{' '}
                {currentPayment.amount != null ? currentPayment.amount : '00'}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="installments">
            Change your password here.
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
