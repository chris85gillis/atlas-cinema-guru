// src/components/Header.tsx
"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="header bg-teal-400 text-white">
      <h1 className="font-bold">Cinema Guru</h1>
      <div>
        {session ? (
          <>
            <span>Welcome, {session.user?.email}</span>
            <button onClick={() => signOut()} className="logout-btn ml-4">
              Logout
            </button>
          </>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
    </header>
  );
};

export default Header;