import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TypeWizard",
  description: "Sickest Typing Game Ever",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <link rel="icon" href="https://i.postimg.cc/cLycJq2n/haticon.png" type="image/png" />
        <head />
        <body>
          {children}
        </body>
      </html>
    </>
  )
}
