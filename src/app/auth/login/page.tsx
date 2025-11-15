// src/app/auth/login/page.tsx
"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="max-w-md mx-auto px-4 pt-24 pb-10">
      <h1 className="text-2xl font-semibold text-neutral-900">
        Sign in to ResumeMint
      </h1>

      <p className="text-neutral-600 text-sm mt-1">
        Welcome back. Let’s continue building your career story.
      </p>

      <div className="mt-8 space-y-4">
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button className="w-full">Continue</Button>
      </div>

      <p className="text-sm text-neutral-600 mt-6">
        Don’t have an account?{" "}
        <Link href="/auth/register" className="text-neutral-900 hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
