export enum IssueStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export enum IssuePriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export const IssueStatusVariant: Record<
  IssueStatus,
  'default' | 'destructive' | 'outline' | 'secondary'
> = {
  [IssueStatus.OPEN]: 'destructive',
  [IssueStatus.IN_PROGRESS]: 'outline',
  [IssueStatus.RESOLVED]: 'secondary',
  [IssueStatus.CLOSED]: 'default',
};

export const IssuePriorityVariant: Record<
  IssuePriority,
  'default' | 'destructive' | 'outline' | 'secondary'
> = {
  [IssuePriority.LOW]: 'outline',
  [IssuePriority.MEDIUM]: 'secondary',
  [IssuePriority.HIGH]: 'destructive',
};

export const IssueStatusLabels: Record<IssueStatus, string> = {
  [IssueStatus.OPEN]: 'Open',
  [IssueStatus.IN_PROGRESS]: 'In Progress',
  [IssueStatus.RESOLVED]: 'Resolved',
  [IssueStatus.CLOSED]: 'Closed',
};

export const IssuePriorityLabels: Record<IssuePriority, string> = {
  [IssuePriority.LOW]: 'Low',
  [IssuePriority.MEDIUM]: 'Medium',
  [IssuePriority.HIGH]: 'High',
};

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
  propertyId: string;
  reportedAt: Date;
  resolvedAt?: Date;
  priority: IssuePriority;
}

export interface NewIssue {
  title: string;
  description: string;
  propertyId: string;
  priority: IssuePriority;
}
