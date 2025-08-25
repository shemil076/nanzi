import { createContext, ReactNode, useContext } from 'react';
import { Issue } from '../types/issue';
import { useAuth } from '../hooks/useAuth';
import { useIssuesByProperty } from '../hooks/useIssue';

interface MaintenanceContextTypes {
  issues: Issue[];
  loadIssues: () => Promise<void>;
  isLoading: boolean;
  error: Error;
}

export const MaintenanceContext = createContext<
  MaintenanceContextTypes | undefined
>(undefined);

export const useMaintenanceContext = () => {
  const context = useContext(MaintenanceContext);
  if (!context) {
    throw new Error(
      'useMaintenanceContext must be used within the MaintenanceContextProvider',
    );
  }
  return context;
};

export const MaintenanceContextProvider = ({
  children,
  propertyId,
}: {
  children: ReactNode;
  propertyId: string;
}) => {
  const { accessToken } = useAuth();
  const { issues, loadIssues, isLoading, error } = useIssuesByProperty(
    accessToken,
    propertyId,
  );

  return (
    <MaintenanceContext.Provider
      value={{
        issues,
        loadIssues,
        isLoading,
        error,
      }}
    >
      {children}
    </MaintenanceContext.Provider>
  );
};
