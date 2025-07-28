import { Building2, House, LucideIcon, MapPin, Store } from 'lucide-react';

export enum PropertyType {
  HOUSE = 'HOUSE',
  APARTMENT = 'APARTMENT',
  COMMERCIAL = 'COMMERCIAL',
  LAND = 'LAND',
}

export enum PropertyStatus {
  AVAILABLE = 'AVAILABLE',
  RENTED = 'RENTED',
  PENDING = 'PENDING',
}

export const PropertyStatusLabels: Record<PropertyStatus, string> = {
  [PropertyStatus.AVAILABLE]: 'Available',
  [PropertyStatus.RENTED]: 'Rented',
  [PropertyStatus.PENDING]: 'Pending',
};

export const PropertyStatusVariant: Record<PropertyStatus, string> = {
  [PropertyStatus.AVAILABLE]: 'destructive',
  [PropertyStatus.RENTED]: 'outline',
  [PropertyStatus.PENDING]: 'default',
};

export enum LandSizeUnit {
  PERCHES = 'PERCHES',
  ACRES = 'ACRES',
}

export const PropertyLabels: Record<PropertyType, string> = {
  [PropertyType.HOUSE]: 'House',
  [PropertyType.APARTMENT]: 'Apartment',
  [PropertyType.COMMERCIAL]: 'Commercial Space',
  [PropertyType.LAND]: 'Land Plot',
};

export const PropertyIcon: Record<PropertyType, LucideIcon> = {
  [PropertyType.HOUSE]: House,
  [PropertyType.APARTMENT]: Building2,
  [PropertyType.COMMERCIAL]: Store,
  [PropertyType.LAND]: MapPin,
};

export const LandSizeUnitLabels: Record<LandSizeUnit, string> = {
  [LandSizeUnit.PERCHES]: 'perches',
  [LandSizeUnit.ACRES]: 'acres',
};

export interface Property {
  id: string;
  title: string;
  description: string;
  address: string;
  price: number;
  landlordId: string;
  status: string;
  propertyType: PropertyType;
  numberOfBeds?: number;
  numberOfBaths?: number;
  landSize?: number;
  landSizeUnit?: string;
  houseSize?: number;
  isFurnished?: boolean;
  apartmentComplex?: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface NewProperty {
  title: string;
  description: string;
  address: string;
  price: number;
  landlordId: string;
  propertyType: PropertyType;
  numberOfBeds?: number;
  numberOfBaths?: number;
  landSize?: number;
  landSizeUnit?: string;
  houseSize?: number;
  isFurnished?: boolean;
  apartmentComplex?: string;
}

export interface PropertiesOverview {
  availablePropertyCount: number;
  rentedPropertyCount: number;
  tenantCount: number;
  monthlyRevenue: number;
  highPriorityIssues: number;
  mediumPriorityIssues: number;
  lowPriorityIssues: number;
}
