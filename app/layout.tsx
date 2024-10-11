'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import './globals.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="custom-dark">
            <div className="min-h-screen bg-[#050201] text-white">
              <main className="container mx-auto p-4">{children}</main>
            </div>
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
};

export default Layout;
