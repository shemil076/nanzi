import { Pencil } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import {
  Issue,
  IssuePriorityLabels,
  IssuePriorityVariant,
  IssueStatusLabels,
  IssueStatusVariant,
} from '../../types/issue';
import { formatToShortDate } from '../../lib/utils/helperFunctions';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

interface IssueComponentProp {
  issue: Issue;
}
const IssueComponent = ({ issue }: IssueComponentProp) => {
  return (
    <Card className="rounded-sm p-1 text-sm gap-0 my-3">
      <CardHeader className="flex flex-col p-2 m-0">
        <div className="w-full flex flex-row  justify-between">
          <div className="flex flex-col gap-1 ">
            <span className="font-semibold">{issue.title}</span>

            <span className="text-xs font-light text-gray-500">
              Reported at {formatToShortDate(issue.reportedAt)}
            </span>
          </div>

          <div className="flex flex-col gap-1 items-center">
            <Badge variant={IssueStatusVariant[issue.status]}>
              {IssueStatusLabels[issue.status]}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="m-0 p-2 w-full flex flex-row justify-between">
        <div className="flex flex-row items-center font-light gap-2">
          <span>Priority</span>
          <Badge variant={IssuePriorityVariant[issue.priority]}>
            {IssuePriorityLabels[issue.priority]}
          </Badge>
        </div>

        <div>
          <Button variant="outline" className="h-8">
            <Pencil />
            <span>Update</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueComponent;
