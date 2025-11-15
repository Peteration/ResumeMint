// src/components/TemplatePreview.tsx
"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

interface TemplatePreviewProps {
  name: string;
  imageUrl: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

export default function TemplatePreview({
  name,
  imageUrl,
  isSelected = false,
  onSelect,
}: TemplatePreviewProps) {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-2xl overflow-hidden border-2 ${
        isSelected ? "border-indigo-600" : "border-transparent"
      } hover:border-indigo-400 transition-all relative`}
    >
      <Image
        src={imageUrl}
        alt={name}
        width={300}
        height={400}
        className="object-cover w-full h-80 rounded-xl"
      />
      {isSelected && (
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
          <CheckCircle2 className="text-indigo-600 w-5 h-5" />
        </div>
      )}
      <div className="text-center py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        {name}
      </div>
    </div>
  );
}
