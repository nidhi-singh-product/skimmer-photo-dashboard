"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface NextPageProps {
  href: string;
  label: string;
  description: string;
}

export function NextPage({ href, label, description }: NextPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Link
        href={href}
        className="group flex items-center justify-between rounded-xl border border-sk-gray-100 bg-white p-4 shadow-sm transition-all hover:border-sk-blue-200 hover:shadow-md sm:p-5"
      >
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-sk-text-disabled sm:text-xs">
            Next
          </div>
          <div className="mt-0.5 text-sm font-bold text-sk-dark-900 sm:text-base" style={{ fontFamily: "var(--font-outfit)" }}>
            {label}
          </div>
          <div className="mt-0.5 text-[10px] text-sk-text-medium sm:text-xs">
            {description}
          </div>
        </div>
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-sk-blue-100 transition-colors group-hover:bg-sk-blue sm:h-10 sm:w-10">
          <ArrowRight className="h-4 w-4 text-sk-dark transition-colors group-hover:text-white" />
        </div>
      </Link>
    </motion.div>
  );
}
