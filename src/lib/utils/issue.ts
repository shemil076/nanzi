/* eslint-disable @typescript-eslint/no-explicit-any */
import { Issue, IssuePriority, IssueStatus } from '../../types/issue';

export const reformatIssue = (data: any): Issue => {
  const reformatIssue: Issue = {
    id: data.id,
    title: data.title,
    description: data.description,
    status: data.status as IssueStatus,
    propertyId: data.propertyId,
    reportedAt: new Date(data.reportedAt),
    resolvedAt: data.resolvedAt ? new Date(data.resolvedAt) : null,
    priority: data.priority as IssuePriority,
  };

  return reformatIssue;
};
