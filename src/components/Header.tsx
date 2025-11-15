// src/components/Header.tsx
"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          ResumeMint
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/editor" className="hover:text-neutral-600">
            Build Resume
          </Link>
          <Link href="/dashboard" className="hover:text-neutral-600">
            Dashboard
          </Link>
          <Link href="/login" className="hover:text-neutral-600 font-medium">
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
