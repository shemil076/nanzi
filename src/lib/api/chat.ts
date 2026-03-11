import axios from 'axios';

export const chatInitialization = (
  accessToken: string,
  propertyId: string,
): Promise<string> => {
  return axios
    .post(`/api/chat/new/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      return res.data as string;
    })
    .catch((err) => {
      throw err;
    });
};
