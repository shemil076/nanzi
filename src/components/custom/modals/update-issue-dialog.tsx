'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Pencil } from 'lucide-react';
import z from 'zod';
import { Issue, IssueStatus } from '../../../types/issue';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../../ui/form';
import IssueStatusSelector from '../issue-status-selector';

const updateIssueForm = z.object({
  id: z.string().nonempty(),
  status: z.nativeEnum(IssueStatus),
});

type UpdateIssueFormType = z.infer<typeof updateIssueForm>;

const UpdateIssueModal = ({ issue }: { issue: Issue }) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<UpdateIssueFormType>({
    resolver: zodResolver(updateIssueForm),
    defaultValues: {
      id: issue.id || '',
      status: issue.status || IssueStatus.OPEN,
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex flex-row items-center">
          <Pencil />
          <span>Update</span>
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
            </DialogContent>
          </form>
        </Form>
      </FormProvider>
    </Dialog>
  );
};

export default UpdateIssueModal;
