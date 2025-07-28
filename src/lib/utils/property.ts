import { PropertiesOverview, Property } from '../../types/property';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const reformatProperty = (data: any): Property => {
  const formattedProperty: Property = {
    id: data.id,
    title: data.title,
    description: data.description,
    address: data.address,
    price: data.price,
    landlordId: data.landlordID,
    status: data.status,
    propertyType: data.propertyType,
    numberOfBeds: data.numberOfBeds ?? null,
    numberOfBaths: data.numberOfBaths ?? null,
    landSize: data.landSize ?? null,
    landSizeUnit: data.landSizeUnit ?? null,
    houseSize: data.houseSize ?? null,
    isFurnished: data.isFurnished ?? null,
    apartmentComplex: data.apartmentComplex ?? null,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };

  return formattedProperty;
};

export const reformatPropertiesOverview = (data: any): PropertiesOverview => {
  const reformattedPropertyOverview: PropertiesOverview = {
    availablePropertyCount: data.availablePropertyCount,
    rentedPropertyCount: data.rentedPropertyCount,
    tenantCount: data.tenantCount,
    monthlyRevenue: data.monthlyRevenue,
    highPriorityIssues: data.highPriorityIssues,
    mediumPriorityIssues: data.mediumPriorityIssues,
    lowPriorityIssues: data.lowPriorityIssues,
  };
  return reformattedPropertyOverview;
};
