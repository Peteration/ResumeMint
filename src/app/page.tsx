// src/app/page.tsx
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight text-neutral-900">
            Craft resumes that impress hiring managers.
          </h1>

          <p className="text-neutral-600 text-lg mt-4 max-w-2xl">
            ResumeMint helps you present your experience clearly, professionally,
            and persuasively — using proven resume structures and AI-powered
            language enhancements trusted by recruiters.
          </p>

          <div className="mt-8 flex gap-4">
            <Link href="/editor">
              <Button variant="primary">Start Building</Button>
            </Link>

            <Link href="/dashboard">
              <Button variant="secondary">View Dashboard</Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 border rounded-lg bg-neutral-50 h-80 flex items-center justify-center text-neutral-400 text-sm">
          Resume Preview Section (coming soon)
        </div>
      </div>
    </section>
  );
}
