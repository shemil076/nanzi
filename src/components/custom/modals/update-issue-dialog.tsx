'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { CircleCheckBig, Pencil, XCircle } from 'lucide-react';
import z from 'zod';
import { Issue, IssueStatus, NewIssueStatus } from '../../../types/issue';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../../ui/form';
import IssueStatusSelector from '../issue-status-selector';
import { useMaintenanceContext } from '../../../contexts/maintenance-context';
import { useUpdateIssueStatus } from '../../../hooks/useIssue';
import { useAuth } from '../../../hooks/useAuth';
import { toast } from 'sonner';

const updateIssueForm = z.object({
  id: z.string().nonempty(),
  status: z.nativeEnum(IssueStatus),
});

type UpdateIssueFormType = z.infer<typeof updateIssueForm>;

const UpdateIssueModal = ({ issue }: { issue: Issue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { accessToken } = useAuth();
  const { updateIssueStatus } = useUpdateIssueStatus();
  const { loadIssues } = useMaintenanceContext();

  const form = useForm<UpdateIssueFormType>({
    resolver: zodResolver(updateIssueForm),
    defaultValues: {
      id: issue.id || '',
      status: issue.status || IssueStatus.OPEN,
    },
  });

  const handleOnSubmit = async (values: UpdateIssueFormType) => {
    if (values) {
      const updatedStatus: NewIssueStatus = {
        id: values.id,
        status: values.status,
      };

      const { success } = await updateIssueStatus(updatedStatus, accessToken);

      if (!success) {
        toast('Failed to update the issue', {
          icon: <XCircle className="text-red-500" />,
          className: 'flex items-center justify-center space-x-2',
        });
      } else {
        toast('Successfully updated the issue ', {
          icon: <CircleCheckBig className="text-green-500" />,
          className: 'flex items-center justify-center gap-5',
        });
        setIsOpen(false);
        form.reset();
        loadIssues();
      }
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex flex-row items-center">
          <Pencil />
        </Button>
      </DialogTrigger>

      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <DialogContent
              className="w-full sm:max-w-[100px] md:max-w-[700px]"
              onPointerDownOutside={(e) => e.preventDefault()}
              onInteractOutside={(e) => e.preventDefault()}
              onEscapeKeyDown={(e) => e.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle>Update Issue</DialogTitle>
                <DialogDescription />
              </DialogHeader>
              <IssueStatusSelector status={issue.status} />

              <DialogFooter>
                <Button onClick={() => form.handleSubmit(handleOnSubmit)()}>
                  Update
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Form>
      </FormProvider>
    </Dialog>
  );
};

export default UpdateIssueModal;
