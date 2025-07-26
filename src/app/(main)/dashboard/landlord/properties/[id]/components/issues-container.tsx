import {
  Card,
  CardContent,
  CardHeader,
} from '../../../../../../../components/ui/card';
import { useAuth } from '../../../../../../../hooks/useAuth';
import { useIssuesByProperty } from '../../../../../../../hooks/useIssue';
import IssueList from './issue-list';

const IssuesContent = ({ propertyId }: { propertyId: string }) => {
  const { accessToken } = useAuth();
  const { issues, isLoading, error } = useIssuesByProperty(
    accessToken,
    propertyId,
  );
  return (
    <Card className="gap-0">
      <CardHeader className="flex flex-row">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Maintenance</span>
        </div>

        <div></div>
      </CardHeader>
      <CardContent className="">
        <IssueList data={issues} />
      </CardContent>
    </Card>
  );
};

export default IssuesContent;
