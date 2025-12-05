// src/lib/pdf.ts
"use client";

import { pdf } from "@react-pdf/renderer";
import type { ReactElement } from "react";

/**
 * savePDF() generates a PDF blob from a React PDF component.
 * Fully client-side, works on Netlify.
 */
export async function savePDF(component: ReactElement) {
  try {
    const blob = await pdf(component).toBlob();
    return blob;
  } catch (err) {
    console.error("savePDF error:", err);
    throw err;
  }
}
