// src/lib/pdf.ts

/**
 * savePDF() calls your API route `/api/pdf`
 * so the client/editor can export resumes without bundling puppeteer.
 *
 * This file ONLY exists to satisfy imports like:
 * import { savePDF } from "@/lib/pdf"
 */

export async function savePDF(html: string) {
  try {
    const res = await fetch("/api/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html }),
    });

    if (!res.ok) {
      throw new Error("Failed to generate PDF");
    }

    const blob = await res.blob();
    return blob; // caller downloads the PDF
  } catch (err) {
    console.error("savePDF error:", err);
    throw err;
  }
}
