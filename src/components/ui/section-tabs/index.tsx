"use client";

interface SectionTabsProps {
  sections: string[];
  active: string;
  onChange: (section: string) => void;
}

export default function SectionTabs({ sections, active, onChange }: SectionTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {sections.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition
            ${active === s
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-gray-400"
            }`}
        >
          {s[0].toUpperCase() + s.slice(1)}
        </button>
      ))}
    </div>
  );
}
