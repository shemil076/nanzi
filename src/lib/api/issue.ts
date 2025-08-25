import axios from 'axios';
import { Issue, NewIssue, NewIssueStatus } from '../../types/issue';
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

export const createIssue = async (
  newIssue: NewIssue,
  accessToken: string,
): Promise<Issue> => {
  return axios
    .post('/api/issue/create', newIssue, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      return reformatIssue(res.data);
    })
    .catch((err) => {
      throw err;
    });
};

export const updateIssueStatusById = async (
  newIssueStatus: NewIssueStatus,
  accessToken: string,
): Promise<Issue> => {
  return axios
    .patch('/api/issue/status', newIssueStatus, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      return reformatIssue(res.data);
    })
    .catch((err) => {
      throw err;
    });
};
