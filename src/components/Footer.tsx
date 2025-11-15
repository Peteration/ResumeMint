// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-neutral-600 flex items-center justify-between">
        <p>© {new Date().getFullYear()} ResumeMint. All rights reserved.</p>
        <a
          href="mailto:support@resumemint.com"
          className="hover:text-neutral-800 transition"
        >
          Contact Support
        </a>
      </div>
    </footer>
  );
}
