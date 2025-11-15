"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { Loader2, Sparkles } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          window.location.href = "/auth/login";
          return;
        }

        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", user.email)
          .single();

        if (error) throw error;

        setUser(data);
      } catch (err) {
        console.error("User fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-indigo-500 w-8 h-8" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">Please log in</h2>
        <Link href="/auth/login" className="text-indigo-600 mt-2 block">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Welcome back, {user.full_name || user.email}
        </h1>
        <span
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            user.plan === "premium"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {user.plan === "premium" ? "🌟 Premium" : "Free"}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Resume Editor Card */}
        <Link
          href="/editor"
          className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">Resume Editor</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Create and customize your resumes easily with AI assistance.
          </p>
        </Link>

        {/* Premium Features / Upgrade */}
        {user.plan === "premium" ? (
          <div className="rounded-2xl border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/10 dark:to-yellow-800/20 p-6 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-yellow-500 w-5 h-5" />
              <h2 className="text-xl font-semibold">Premium Tools</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              You have access to advanced templates, cover letter AI, and ATS keyword optimization.
            </p>
            <Link
              href="/editor"
              className="inline-block bg-yellow-500 text-white font-medium px-4 py-2 rounded-xl hover:bg-yellow-600 transition"
            >
              Start Premium Editor
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-900 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Upgrade to Premium</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Unlock unlimited resumes, AI cover letters, and advanced templates.
            </p>
            <Link
              href="/pricing"
              className="inline-block bg-indigo-600 text-white font-medium px-4 py-2 rounded-xl hover:bg-indigo-700 transition"
            >
              View Plans
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
