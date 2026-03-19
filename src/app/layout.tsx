import type { Metadata } from "next";
import { Outfit, Roboto } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { NavBar } from "./nav";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skimmer Photo Intelligence",
  description: "AI-powered analysis of 211M+ field service photos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${roboto.variable} antialiased`}
        style={{ fontFamily: "var(--font-roboto), system-ui, sans-serif", background: "#FCFCFC", color: "#212B36" }}
      >
        <NavBar />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
