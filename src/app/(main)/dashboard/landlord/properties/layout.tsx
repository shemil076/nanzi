import React, { FC } from 'react';

const PropertiesLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <main>{children}</main>;
};

export default PropertiesLayout;
