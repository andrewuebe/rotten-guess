import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-2 md:px-0">
      <div className="w-full max-w-2xl p-6 bg-white">
        {children}
      </div>
    </div>
  );
}

export default AppLayout;
