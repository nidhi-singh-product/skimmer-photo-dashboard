"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Overview" },
  { href: "/explorer", label: "Photo Explorer" },
  { href: "/equipment", label: "Equipment Records" },
  { href: "/pilot", label: "Pilot Scorecard" },
  { href: "/company", label: "Company Deep Dive" },
  { href: "/demo", label: "Live Demo" },
  { href: "/vision", label: "Vision & Roadmap" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-sk-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/skimmer-logo.svg"
            alt="Skimmer"
            width={140}
            height={20}
            className="h-5 w-auto"
          />
          <span className="hidden text-sk-gray-300 sm:inline">|</span>
          <span
            className="hidden text-base font-semibold text-sk-dark-800 sm:inline"
            style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}
          >
            Photo Intelligence
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden gap-1 md:flex">
          {links.map((l) => {
            const isActive = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-sk-blue-100 text-sk-blue"
                    : "text-sk-text-medium hover:bg-sk-blue-light hover:text-sk-dark"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-sk-text-medium transition-colors hover:bg-sk-gray-100 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="animate-fade-in border-t border-sk-gray-100 bg-white px-4 pb-4 md:hidden">
          {links.map((l) => {
            const isActive = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sk-blue-100 text-sk-blue"
                    : "text-sk-text-medium hover:bg-sk-blue-light"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
