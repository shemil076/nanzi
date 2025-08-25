import { useMaintenanceContext } from '../../contexts/maintenance-context';
import { useAuth } from '../../hooks/useAuth';
import { useIssuesByProperty } from '../../hooks/useIssue';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import AddIssueForm from './add-issue-form';
import IssueList from './issue-list';

interface IssuesContentProps {
  propertyId: string;
  isTenant?: boolean;
}

const IssuesContent = ({ propertyId, isTenant }: IssuesContentProps) => {
  // const { accessToken } = useAuth();
  // const { issues, loadIssues, isLoading, error } = useIssuesByProperty(
  //   accessToken,
  //   propertyId,
  // );

  const { issues, loadIssues, isLoading, error } = useMaintenanceContext();

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
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Maintenance</span>
        </div>

        {isTenant && (
          <div>
            <AddIssueForm propertyId={propertyId} loadIssues={loadIssues} />
          </div>
        )}
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
