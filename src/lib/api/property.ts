import axios from 'axios';
import {
  NewProperty,
  PropertiesOverview,
  Property,
} from '../../types/property';
import {
  reformatPropertiesOverview,
  reformatProperty,
} from '../utils/property';

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

export const fetchProperties = async (
  accessToken: string,
): Promise<Property[]> => {
  return axios
    .get('/api/property/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      return res.data.map((item) => {
        return reformatProperty(item);
      });
    })
    .catch((err) => {
      throw err;
    });
};

export const fetchProperty = async (
  accessToken: string,
  id: string,
): Promise<Property> => {
  return axios
    .get(`/api/property/${id}`, {
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

export const getPropertiesOverview = async (
  accessToken: string,
): Promise<PropertiesOverview> => {
  return axios
    .get('/api/property/propertyOverview', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      return reformatPropertiesOverview(res.data);
    })
    .catch((err) => {
      throw err;
    });
};
