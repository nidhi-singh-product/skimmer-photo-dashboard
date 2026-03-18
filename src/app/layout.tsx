import type { Metadata } from "next";
import { Outfit, Roboto } from "next/font/google";
import Link from "next/link";
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
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sk-blue">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold text-sk-dark-900" style={{ fontFamily: "var(--font-outfit)" }}>
                  Skimmer Photo Intelligence
                </span>
                <span className="ml-2 rounded-full bg-sk-sunrise-100 px-2 py-0.5 text-xs font-medium text-sk-sunrise">
                  Proof of Concept
                </span>
              </div>
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
