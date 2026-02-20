import { Eye } from 'lucide-react';
import { Button } from '../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import {
  Ai_MaintenanceCategoryLabels,
  Ai_MaintenanceUrgencyLevelLabels,
  Issue,
  IssueStatusLabels,
  IssueStatusVariant,
} from '../../../types/issue';
import { formatToShortDate } from '../../../lib/utils/helperFunctions';
import { Badge } from '../../ui/badge';
import { Alert, AlertDescription } from '../../ui/alert';

export function IssueInfoDialog({ issue }: { issue: Issue }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex flex-row items-center">
          <Eye />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[00px] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{issue.title}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <div className="w-full flex flex-row  justify-between">
            <div className="flex flex-col gap-2 ">
              <div className="grid grid-cols-2 text-md font-light text-gray-500 gap-5">
                <div>Reported at:</div>
                <div className="font-bold">
                  {formatToShortDate(issue.reportedAt)}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 items-center">
              <Badge variant={IssueStatusVariant[issue.status]}>
                {IssueStatusLabels[issue.status]}
              </Badge>
            </div>
          </div>

          {issue.ai_category && (
            <div className="grid grid-cols-[auto_1fr] items-start gap-10">
              <div className=" text-md font-light text-gray-500">Category:</div>

              <div>
                <Badge variant="outline">
                  {Ai_MaintenanceCategoryLabels[issue.ai_category]}
                </Badge>
              </div>
            </div>
          )}

          {issue.ai_urgency && (
            <div className="grid grid-cols-[auto_1fr] items-start gap-1">
              <div className=" text-md font-light text-gray-500">
                Urgency Level:
              </div>

              <div>
                <Badge variant="outline">
                  {Ai_MaintenanceUrgencyLevelLabels[issue.ai_urgency]}
                </Badge>
              </div>
            </div>
          )}

          {issue.ai_description && (
            <div className="w-full flex flex-col justify-items-start gap-3 ">
              <span className="text-md font-light text-gray-500">
                Description:
              </span>
              <Alert className="w-full">
                <AlertDescription>{issue.ai_description}</AlertDescription>
              </Alert>
            </div>
          )}

          {issue.ai_suggestions && (
            <div className="w-full flex flex-col justify-items-start gap-3 ">
              <span className="text-md font-light text-gray-500">
                Suggestions:
              </span>
              <Alert className="w-full">
                <AlertDescription>{issue.ai_suggestions}</AlertDescription>
              </Alert>
            </div>
          )}
        </div>
        <DialogFooter>
          <div className="text-xs">Powered by nanzi AI</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
