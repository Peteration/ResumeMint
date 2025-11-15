// src/components/ResumeCard.tsx
"use client";

import { formatDate } from "@/lib/utils";
import { FileText, Edit3, Download } from "lucide-react";

interface ResumeCardProps {
  title: string;
  updatedAt: string;
  onEdit?: () => void;
  onDownload?: () => void;
}

export default function ResumeCard({
  title,
  updatedAt,
  onEdit,
  onDownload,
}: ResumeCardProps) {
  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow hover:shadow-lg transition-all duration-300 flex flex-col justify-between w-full max-w-sm">
      <div className="flex items-center gap-3 mb-3">
        <FileText className="w-6 h-6 text-indigo-600" />
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Last updated: {formatDate(updatedAt)}
      </p>

      <div className="flex items-center justify-between">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
        >
          <Edit3 className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={onDownload}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  );
}
