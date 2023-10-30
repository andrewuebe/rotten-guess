import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="font-montserrat font-light pt-[54px] font-ubuntu">
      {children}
    </div>
  );
}

export default AppLayout;
