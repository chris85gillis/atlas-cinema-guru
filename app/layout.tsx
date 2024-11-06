// app/layout.tsx
import { SessionProvider } from "next-auth/react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./global.css";

export const metadata = {
  title: "My App",
  description: "Welcome to My App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SessionProvider>
          <Header />
          <div className="layout flex h-screen">
            {/* Sidebar Container */}
            <div className="sidebar-container h-full">
              <Sidebar />
            </div>
            {/* Main Content Container */}
            <div className="content-container flex-grow h-full overflow-y-auto">
              <main className="content">{children}</main>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}