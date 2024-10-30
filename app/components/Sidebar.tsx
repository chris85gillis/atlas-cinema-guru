// src/components/Sidebar.tsx
"use client";
import React from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <aside
      className="sidebar h-full bg-teal-300 p-4 transition-all duration-300 ease-in-out group hover:w-64 w-16"
    >
      <nav>
        <Link href="/" className="flex items-center p-2">
          <span className="sidebar-icon">🏠</span>
          <span className="sidebar-text ml-2 hidden group-hover:inline">Home</span>
        </Link>
        <Link href="/favorites" className="flex items-center p-2">
          <span className="sidebar-icon">⭐</span>
          <span className="sidebar-text ml-2 hidden group-hover:inline">Favorites</span>
        </Link>
        <Link href="/watch-later" className="flex items-center p-2">
          <span className="sidebar-icon">⏰</span>
          <span className="sidebar-text ml-2 hidden group-hover:inline">Watch Later</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;