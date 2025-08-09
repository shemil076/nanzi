import axios from 'axios';
import {
  NewProperty,
  PropertiesOverview,
  Property,
  UpdateProperty,
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
    .get('/api/property', {
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

export const updatePropertyById = async (
  accessToken: string,
  propertyId: string,
  updateDetails: UpdateProperty,
): Promise<Property> => {
  console.log('Running', updateDetails);
  return axios
    .put(`/api/property/update/${propertyId}`, updateDetails, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      console.log('res', res.data);
      return reformatProperty(res.data);
    })
    .catch((err) => {
      console.log('Error occurred', err);
      throw err;
    });
};

export const deletePropertyById = async (
  accessToken: string,
  propertyId: string,
): Promise<Property> => {
  return axios
    .patch(`/api/property/delete/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      return reformatProperty(res.data);
    })
    .catch((err) => {
      console.log('Error occurred', err);
      throw err;
    });
};

export const getTenantsResidence = async (accessToken): Promise<Property> => {
  return axios
    .get('/api/property/tenants-residence', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      return reformatProperty(res.data.property);
    })
    .catch((err) => {
      console.log('Error occurred', err);
      throw err;
    });
};

export const getPropertyToOccupy = async (accessToken): Promise<Property> => {
  return axios
    .get('/api/property/tenant-to-occupy', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      return reformatProperty(res.data.property);
    })
    .catch((err) => {
      console.log('Error occurred', err);
      throw err;
    });
};
