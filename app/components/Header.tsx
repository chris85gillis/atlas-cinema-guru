// src/components/Header.tsx
"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="header bg-teal-400 flex items-center justify-between px-6 py-4 text-white">
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold">🎬</span>
        <h1 className="text-xl font-bold">Cinema Guru</h1>
      </div>
      <div>
        {session ? (
          <div className="flex items-center space-x-4">
            <span>Welcome, {session.user?.email}</span>
            <button onClick={() => signOut()} className="logout-btn flex items-center space-x-1">
              {/* Logout Icon placed to the left */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H3m12 0l-4 4m4-4l-4-4m9 4a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
    </header>
  );
};

export default Header;