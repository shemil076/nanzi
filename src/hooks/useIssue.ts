/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { fetchIssuesByProperty } from "../lib/api/issue";
import { Issue } from "../types/issue";

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
