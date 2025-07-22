import React, { FC } from 'react';

const PropertyLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <main>{children}</main>;
};

export default PropertyLayout;
