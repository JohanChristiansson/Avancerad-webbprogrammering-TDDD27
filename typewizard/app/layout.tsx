import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Type Wizard",
  description: "The Best Typing game",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className='dark'>
      <body className={inter.className}>{children}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}