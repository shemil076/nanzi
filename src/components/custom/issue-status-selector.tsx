'use client';

import { useFormContext } from 'react-hook-form';
import { IssueStatus, IssueStatusLabels } from '../../types/issue';
import { FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';

const statusFlow: Record<IssueStatus, IssueStatus[]> = {
  [IssueStatus.OPEN]: [
    IssueStatus.IN_PROGRESS,
    IssueStatus.RESOLVED,
    IssueStatus.CLOSED,
  ],
  [IssueStatus.IN_PROGRESS]: [IssueStatus.RESOLVED, IssueStatus.CLOSED],
  [IssueStatus.RESOLVED]: [IssueStatus.CLOSED],
  [IssueStatus.CLOSED]: [],
};

const IssueStatusSelector = ({ status }: { status: IssueStatus }) => {
  const { control, watch } = useFormContext();

  const currentStatus = watch('status');
  const nextStatuses = statusFlow[status];
  return (
    <FormField
      control={control}
      name="status"
      render={({ field, fieldState }) => (
        <FormItem className="w-full">
          <FormLabel>Issue Status</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger
                className={`w-full justify-center border text-center disabled:text-black disabled:opacity-100 ${fieldState.error ? 'border-red-500' : ''}`}
              >
                {IssueStatusLabels[currentStatus]}
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {nextStatuses.length === 0 ? (
                <SelectItem value={field.value} disabled>
                  No further updates
                </SelectItem>
              ) : (
                nextStatuses.map((status, index) => (
                  <SelectItem key={index} value={status}>
                    {IssueStatusLabels[status]}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default IssueStatusSelector;
