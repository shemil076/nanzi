import axios from 'axios';
import { Issue } from '../../types/issue';
import { reformatIssue } from '../utils/issue';

export const fetchIssuesByProperty = (
  accessToken: string,
  propertyId: string,
): Promise<Issue[]> => {
  return axios
    .get(`/api/issue/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      return res.data.map((item) => {
        return reformatIssue(item);
      });
    })
    .catch((err) => {
      throw err;
    });
};
