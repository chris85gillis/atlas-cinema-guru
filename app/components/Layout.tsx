// src/components/Layout.tsx
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="h-screen flex flex-col">
    <Header />
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 bg-gray-900 p-8 text-white">
        {children}
      </main>
    </div>
  </div>
);

export default Layout;