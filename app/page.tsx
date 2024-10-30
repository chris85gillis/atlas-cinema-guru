// app/page.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import Layout from "./components/Layout";
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Layout>
            {children}
          </Layout>
        </SessionProvider>
      </body>
    </html>
  );
}