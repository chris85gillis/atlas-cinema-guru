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
      <body>
        <SessionProvider>
          <Header />
          <div className="layout flex">
            <Sidebar />
            <main className="content flex-grow">{children}</main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}