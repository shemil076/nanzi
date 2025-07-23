import axios from 'axios';
import { NewProperty, Property } from '../../types/property';
import { reformatProperty } from '../utils/property';

export const createProperty = async (
  newProperty: NewProperty,
  accessToken: string,
): Promise<Property> => {
  return axios
    .post('/api/property/create', newProperty, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      return reformatProperty(res.data);
    })
    .catch((err) => {
      throw err;
    });
};
