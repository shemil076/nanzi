/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
  createIssue,
  fetchIssuesByProperty,
  updateIssueStatusById,
} from '../lib/api/issue';
import { Issue, NewIssue, NewIssueStatus } from '../types/issue';

export const useIssuesByProperty = (
  accessToken: string,
  propertyId: string,
) => {
  const [issues, setIssues] = useState<Issue[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const loadIssues = async () => {
    if (!accessToken || !propertyId) {
      setError(new Error('No access or Invalid id'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const data = await fetchIssuesByProperty(accessToken, propertyId);
      setIssues(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken && propertyId) {
      loadIssues();
    }
  }, [accessToken, propertyId]);

  return { issues, loadIssues, isLoading, error };
};

export const useCreateIssue = () => {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const addIssue = async (newIssue: NewIssue, accessToken: string) => {
    if (!newIssue || !accessToken) {
      setError(new Error('Invalid data'));
      setIsLoading(false);
      return { success: false, error };
    }

    try {
      setIsLoading(true);
      const data = await createIssue(newIssue, accessToken);
      setIssue(data);
      return { success: true };
    } catch (err) {
      setError(err as Error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return { addIssue, issue, isLoading };
};

export const useUpdateIssueStatus = () => {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const updateIssueStatus = async (
    newIssueStatus: NewIssueStatus,
    accessToken: string,
  ) => {
    if (!newIssueStatus || !accessToken) {
      setError(new Error('Invalid data'));
      setIsLoading(false);
      return { success: false, error };
    }

    try {
      setIsLoading(true);
      const data = await updateIssueStatusById(newIssueStatus, accessToken);
      setIssue(data);
      return { success: true };
    } catch (err) {
      setError(err as Error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return { updateIssueStatus, issue, isLoading };
};
