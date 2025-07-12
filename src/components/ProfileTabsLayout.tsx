// components/ProfileTabsLayout.tsx
import React from "react";
import TabMenu from "./TabMenu";

interface ProfileTabsLayoutProps {
  children: React.ReactNode;
}

const ProfileTabsLayout: React.FC<ProfileTabsLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <TabMenu />
        </div>
      </div>
      <main className="max-w-6xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
};

export default ProfileTabsLayout;