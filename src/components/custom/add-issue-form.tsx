'use client';

import z from 'zod';
import {
  IssuePriority,
  IssuePriorityLabels,
  IssueStatus,
} from '../../types/issue';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { TriangleAlert } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const issueForm = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long'),
  description: z.string().nonempty(),
  priority: z.nativeEnum(IssuePriority),
});

type IssueFormData = z.infer<typeof issueForm>;

const AddIssueForm = () => {
  const { user, accessToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<IssueFormData>({
    resolver: zodResolver(issueForm),
    defaultValues: {
      title: '',
      description: '',
      priority: IssuePriority.LOW,
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <div className="flex flex-row justify-center items-center gap-3">
            <TriangleAlert size={20} />
            Report Issue.
          </div>
        </Button>
      </DialogTrigger>

      <Form {...form}>
        <form>
          <DialogContent
            className="w-full sm:max-w-[00px] md:max-w-[900px]"
            onPointerDownOutside={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>Report your issue</DialogTitle>
              <div className="flex flex-row justify-center"></div>
              <div className="flex flex-row justify-center"></div>
              <DialogDescription />
            </DialogHeader>

            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        className="border text-center disabled:text-black disabled:opacity-100"
                        {...field}
                        placeholder="ex: Spacious 2-Bedroom Apartment in Downtown Colombo"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="border text-center disabled:text-black disabled:opacity-100"
                        {...field}
                        placeholder="Description about the property"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field, fieldState }) => (
                  <FormItem className="w-full">
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger
                        className={`w-1/2 justify-center border text-center disabled:text-black disabled:opacity-100 ${fieldState.error ? 'border-red-500' : ''}`}
                      >
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(IssuePriority).map((priority, index) => (
                          <SelectItem
                            key={index}
                            value={priority}
                            className="text-center"
                          >
                            {IssuePriorityLabels[priority]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => {}}>
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};

export default AddIssueForm;
