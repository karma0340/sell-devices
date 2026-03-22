import type { Metadata } from "next";
import LayoutClient from '@/components/LayoutClient';
import "./globals.css";

export const metadata: Metadata = {
  title: "Berlin Smart Devices | Premium Tech Store",
  description: "The city's finest collection of mobile phones and smart tech gadgets in the heart of Berlin.",
};

import Providers from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <Providers>
          <LayoutClient>
            {children}
          </LayoutClient>
        </Providers>
      </body>
    </html>
  );
}
