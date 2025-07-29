import { Trash2 } from 'lucide-react';

import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

interface DeleteDialogProps {
  id: string;
  handleDeactivate: (paymentId: string) => void;
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost';
}
const DeleteDialog = ({ id, handleDeactivate, variant }: DeleteDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant ? variant : 'secondary'} size="icon">
          <Trash2 className="h-4 w-4" color="grey" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{}</AlertDialogTitle>
          <AlertDialogDescription className="text-black">
            Are you sure you want to delete this record? This action is
            irreversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => handleDeactivate(id)}>
            Yes
          </AlertDialogAction>
          <AlertDialogCancel>No</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
