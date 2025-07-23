import { Property } from '../../types/property';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const reformatProperty = (data: any): Property => {
  const formattedProperty: Property = {
    id: data.ID,
    title: data.Title,
    description: data.Description,
    address: data.Address,
    price: data.Price,
    landlordId: data.LandlordID,
    status: data.Status,
    propertyType: data.PropertyType,
    numberOfBeds: data.NumberOfBeds ?? null,
    numberOfBaths: data.NumberOfBaths ?? null,
    landSize: data.LandSize ?? null,
    landSizeUnit: data.LandSizeUnit ?? null,
    houseSize: data.HouseSize ?? null,
    isFurnished: data.IsFurnished ?? null,
    apartmentComplex: data.ApartmentComplex ?? null,
    createdAt: new Date(data.CreatedAt),
    updatedAt: new Date(data.UpdatedAt),
  };

  return formattedProperty;
};
