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

export enum Ai_MaintenanceCategory {
  ELECTRICAL = 'ELECTRICAL',
  PLUMBING = 'PLUMBING',
  CLEANING = 'CLEANING',
  CARPENTRY = 'CARPENTRY',
  PAINTING = 'PAINTING',
  APPLIANCE = 'APPLIANCE',
  STRUCTURAL = 'STRUCTURAL',
  PEST_CONTROL = 'PEST_CONTROL',
  LANDSCAPING = 'LANDSCAPING',
  SECURITY = 'SECURITY',
  FIRE_SAFETY = 'FIRE_SAFETY',
  ELEVATOR = 'ELEVATOR',
  GENERAL = 'GENERAL',
}

export enum Ai_MaintenanceUrgencyLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
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

export const Ai_MaintenanceCategoryLabels: Record<
  Ai_MaintenanceCategory,
  string
> = {
  [Ai_MaintenanceCategory.ELECTRICAL]: 'Electrical',
  [Ai_MaintenanceCategory.PLUMBING]: 'Plumbing',
  [Ai_MaintenanceCategory.CLEANING]: 'Cleaning',
  [Ai_MaintenanceCategory.CARPENTRY]: 'Carpentry',
  [Ai_MaintenanceCategory.PAINTING]: 'Painting',
  [Ai_MaintenanceCategory.APPLIANCE]: 'Appliance',
  [Ai_MaintenanceCategory.STRUCTURAL]: 'Structural',
  [Ai_MaintenanceCategory.PEST_CONTROL]: 'Pest Control',
  [Ai_MaintenanceCategory.LANDSCAPING]: 'Landscaping',
  [Ai_MaintenanceCategory.SECURITY]: 'Security',
  [Ai_MaintenanceCategory.FIRE_SAFETY]: 'Fire Safety',
  [Ai_MaintenanceCategory.ELEVATOR]: 'Elevator',
  [Ai_MaintenanceCategory.GENERAL]: 'General',
};

export const Ai_MaintenanceUrgencyLevelLabels: Record<
  Ai_MaintenanceUrgencyLevel,
  string
> = {
  [Ai_MaintenanceUrgencyLevel.LOW]: 'Low',
  [Ai_MaintenanceUrgencyLevel.MEDIUM]: 'Medium',
  [Ai_MaintenanceUrgencyLevel.HIGH]: 'High',
  [Ai_MaintenanceUrgencyLevel.CRITICAL]: 'Critical',
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

  ai_category?: Ai_MaintenanceCategory;
  ai_urgency?: Ai_MaintenanceUrgencyLevel;
  ai_description?: string;
  ai_suggestions?: string;
  ai_confidence?: number;
  ai_processedAt?: Date;
}

export interface NewIssue {
  title: string;
  description: string;
  propertyId: string;
  priority: IssuePriority;
}

export interface NewIssueStatus {
  id: string;
  status: IssueStatus;
}
