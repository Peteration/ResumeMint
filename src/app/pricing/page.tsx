"use client";

import { useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async (plan: string, method: "stripe" | "paystack") => {
    setLoading(true);
    try {
      const email =
        typeof window !== "undefined"
          ? localStorage.getItem("userEmail") || "guest@example.com"
          : "guest@example.com";

      const amount = plan === "premium" ? 10 : 0; // $10 premium

      const res = await fetch("/api/billing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, email, amount, method }),
      });

      const data = await res.json();
      if (data?.url) window.location.href = data.url;
      else alert("Payment initialization failed. Try again.");
    } catch (error) {
      console.error("Billing error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Upgrade Your ResumeMint Plan
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Start free, then unlock AI cover letters, unlimited resumes, and
          advanced templates with Premium.
        </p>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="rounded-3xl border border-gray-200 dark:border-zinc-800 p-8 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-all flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">Free</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Get started with essential tools and one free AI-generated resume.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "1 AI-generated resume",
              "1 downloadable PDF",
              "Basic templates",
              "Access to dashboard",
            ].map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
          <Link
            href="/editor"
            className="mt-auto bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-800 dark:text-white font-medium py-3 rounded-xl text-center transition"
          >
            Continue Free
          </Link>
        </div>

        {/* Premium Plan */}
        <div className="rounded-3xl border-2 border-indigo-600 p-8 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white shadow-lg hover:shadow-2xl transition-all flex flex-col relative overflow-hidden">
          <div className="absolute top-4 right-4">
            <Sparkles className="text-yellow-300 w-6 h-6" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Premium</h2>
          <p className="text-indigo-100 mb-6">
            Unlock unlimited AI resumes, cover letters, and advanced design templates.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Unlimited AI resumes",
              "AI cover letter generator",
              "Advanced templates & branding",
              "ATS keyword optimization",
              "Priority PDF export speed",
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 mt-auto">
            <button
              disabled={loading}
              onClick={() => handleUpgrade("premium", "stripe")}
              className="bg-white text-indigo-700 font-semibold py-3 rounded-xl hover:bg-gray-100 transition disabled:opacity-70"
            >
              {loading ? "Processing..." : "Pay with Stripe ($10)"}
            </button>
            <button
              disabled={loading}
              onClick={() => handleUpgrade("premium", "paystack")}
              className="bg-yellow-400 text-indigo-900 font-semibold py-3 rounded-xl hover:bg-yellow-300 transition disabled:opacity-70"
            >
              {loading ? "Processing..." : "Pay with Paystack (₦10 equivalent)"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
