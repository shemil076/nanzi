export enum PropertyType {
  HOUSE = 'HOUSE',
  APARTMENT = 'APARTMENT',
  COMMERCIAL = 'COMMERCIAL',
  LAND = 'LAND',
}

export enum LandSizeUnit {
  PERCHES = 'PERCHES',
  ACRES = 'ACRES',
}

export const PropertyLabels: Record<PropertyType, string> = {
  [PropertyType.HOUSE]: 'House',
  [PropertyType.APARTMENT]: 'Apartment',
  [PropertyType.COMMERCIAL]: 'Commercial Space',
  [PropertyType.LAND]: 'Land',
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
