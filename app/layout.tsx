import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import MainNavigation from "./components/MainNavigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Management App",
  description: "Project management application use nextjs and prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={`${inter.className} bg-slate-100 dark:bg-slate-900`}>
        <MainNavigation />
        <main className='flex flex-col items-center'>
          <div className='w-full max-w-6xl px-3 py-5'>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
