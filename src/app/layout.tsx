import type { Metadata } from "next";
import { Outfit, Roboto } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

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
        className={`${outfit.variable} ${roboto.variable} antialiased bg-white text-sk-text`}
        style={{ fontFamily: "var(--font-roboto), system-ui, sans-serif" }}
      >
        <nav className="sticky top-0 z-50 border-b border-sk-gray-100 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/skimmer-logo.svg"
                alt="Skimmer"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-lg font-bold text-sk-dark-900" style={{ fontFamily: "var(--font-outfit)" }}>
                Photo Intelligence
              </span>
            </Link>
            <div className="flex gap-1">
              <Link
                href="/"
                className="rounded-lg px-4 py-2 text-sm font-medium text-sk-text-medium transition-colors hover:bg-sk-blue-light hover:text-sk-blue"
              >
                Overview
              </Link>
              <Link
                href="/pilot"
                className="rounded-lg px-4 py-2 text-sm font-medium text-sk-text-medium transition-colors hover:bg-sk-blue-light hover:text-sk-blue"
              >
                Pilot Scorecard
              </Link>
            </div>
          </div>
        </nav>
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
