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
    ai_category: data.ai_category ?? null,
    ai_urgency: data.ai_urgency ?? null,
    ai_description: data.ai_description ?? null,
    ai_suggestions: data.ai_suggestions ?? null,
    ai_confidence: data.ai_confidence ?? null,
    ai_processedAt: data.ai_processedAt ? new Date(data.ai_processedAt) : null,
  };

  return reformatIssue;
};
