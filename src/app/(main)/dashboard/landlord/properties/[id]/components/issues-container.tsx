import {
  Card,
  CardContent,
  CardHeader,
} from '../../../../../../../components/ui/card';
import { Skeleton } from '../../../../../../../components/ui/skeleton';
import { useAuth } from '../../../../../../../hooks/useAuth';
import { useIssuesByProperty } from '../../../../../../../hooks/useIssue';
import IssueList from './issue-list';

const IssuesContent = ({ propertyId }: { propertyId: string }) => {
  const { accessToken } = useAuth();
  const { issues, isLoading, error } = useIssuesByProperty(
    accessToken,
    propertyId,
  );

  if (isLoading || error) {
    return (
      <Card className="gap-0">
        <CardHeader className="flex flex-row">
          <div className="flex flex-col">
            <span className="text-2xl font-bold">Maintenance</span>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 my-2">
          <Skeleton className="h-[50px] w-[500px] rounded-2xl" />
          <Skeleton className="h-[20px] w-[500px] rounded-2xl" />
          <Skeleton className="h-[20px] w-[300px] rounded-2xl" />
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="gap-0">
      <CardHeader className="flex flex-row">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Maintenance</span>
        </div>

        <div></div>
      </CardHeader>
      <CardContent className="">
        {issues && issues.length > 0 ? (
          <IssueList data={issues} />
        ) : (
          <div className="flex flex-col items-center m-5  text-gray-400">
            <div className=" text-sm font-semibold">
              No Maintenance at the Moment
            </div>
            <div className="text-xs"> Will inform once you get issues </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IssuesContent;
