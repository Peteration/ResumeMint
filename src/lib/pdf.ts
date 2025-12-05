// src/lib/pdf.ts

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Client-side PDF generator using HTML → Canvas → PDF.
 * Works on Netlify, Vercel, and all static hosts.
 */

export async function savePDFClient() {
  try {
    const element = document.getElementById("resume-preview");
    if (!element) throw new Error("Resume preview not found");

    // Capture screenshot
    const canvas = await html2canvas(element, {
      scale: 2, // better quality
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save("resume.pdf");
  } catch (err) {
    console.error("PDF EXPORT ERROR:", err);
    throw err;
  }
}
