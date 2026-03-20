"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

interface NavGroup {
  label: string;
  items: { href: string; label: string }[];
}

const navGroups: (NavGroup | { href: string; label: string })[] = [
  {
    label: "The Data",
    items: [
      { href: "/", label: "Overview" },
      { href: "/explorer", label: "Photo Explorer" },
    ],
  },
  {
    label: "The Proof",
    items: [
      { href: "/pilot", label: "AI Validation" },
      { href: "/equipment", label: "Equipment Intelligence" },
    ],
  },
  {
    label: "The Case",
    items: [
      { href: "/company", label: "Company Deep Dive" },
      { href: "/demand", label: "Customer Demand" },
    ],
  },
  { href: "/demo", label: "Live Demo" },
  { href: "/vision", label: "Vision & Roadmap" },
];

function isGroup(item: NavGroup | { href: string; label: string }): item is NavGroup {
  return "items" in item;
}

/* Desktop dropdown */
function DesktopDropdown({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isActive = group.items.some((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
          isActive
            ? "bg-sk-blue-100 text-sk-blue"
            : "text-sk-text-medium hover:bg-sk-blue-light hover:text-sk-dark"
        }`}
      >
        {group.label}
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-52 overflow-hidden rounded-xl border border-sk-gray-100 bg-white py-1 shadow-lg">
          <div className="px-3 py-1.5">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-sk-text-disabled">{group.label}</span>
          </div>
          {group.items.map((item) => {
            const itemActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 text-sm transition-colors ${
                  itemActive
                    ? "bg-sk-blue-100 font-semibold text-sk-blue"
                    : "text-sk-text-medium hover:bg-sk-blue-light hover:text-sk-dark"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* Mobile collapsible group */
function MobileGroup({ group, pathname, onNavigate }: { group: NavGroup; pathname: string; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(true);
  const isActive = group.items.some((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
          isActive ? "text-sk-blue" : "text-sk-text-medium"
        }`}
      >
        {group.label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded && (
        <div className="ml-3 space-y-0.5 border-l-2 border-sk-gray-100 pl-3">
          {group.items.map((item) => {
            const itemActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                  itemActive
                    ? "bg-sk-blue-100 font-semibold text-sk-blue"
                    : "text-sk-text-medium hover:bg-sk-blue-light"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-sk-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/skimmer-logo.svg" alt="Skimmer" width={140} height={20} className="h-5 w-auto" />
          <span className="hidden text-sk-gray-300 sm:inline">|</span>
          <span className="hidden text-base font-semibold text-sk-dark-800 sm:inline" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
            Photo Intelligence
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 md:flex">
          {navGroups.map((item, i) =>
            isGroup(item) ? (
              <DesktopDropdown key={i} group={item} pathname={pathname} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  pathname.startsWith(item.href)
                    ? "bg-sk-blue-100 text-sk-blue"
                    : "text-sk-text-medium hover:bg-sk-blue-light hover:text-sk-dark"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
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
        <div className="border-t border-sk-gray-100 bg-white px-4 pb-4 pt-2 md:hidden" style={{ animation: "fadeIn 0.2s ease-out" }}>
          {navGroups.map((item, i) =>
            isGroup(item) ? (
              <MobileGroup key={i} group={item} pathname={pathname} onNavigate={() => setOpen(false)} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  pathname.startsWith(item.href)
                    ? "bg-sk-blue-100 text-sk-blue"
                    : "text-sk-text-medium hover:bg-sk-blue-light"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}
