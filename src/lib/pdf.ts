// src/lib/pdf.ts
import { Resume } from "@/types/resume";
import PDFDocument from "pdfkit";
import { Readable } from "stream";

// Returns a Node.js stream (works perfectly on Netlify + Vercel)
export function generateResumePDF(resume: Resume): Readable {
  const doc = new PDFDocument({ margin: 50 });
  const stream = new Readable({ read() {} });

  doc.on("data", (chunk) => stream.push(chunk));
  doc.on("end", () => stream.push(null));

  // Header
  doc.fontSize(22).text(resume.fullName, { bold: true });
  doc.fontSize(14).text(resume.title);
  doc.moveDown();

  // Contact
  doc.fontSize(12).text(`Email: ${resume.email}`);
  doc.text(`Phone: ${resume.phone}`);
  doc.text(`Location: ${resume.location}`);
  if (resume.website) doc.text(`Website: ${resume.website}`);
  if (resume.github) doc.text(`GitHub: ${resume.github}`);
  if (resume.linkedin) doc.text(`LinkedIn: ${resume.linkedin}`);
  doc.moveDown();

  // Summary
  if (resume.summary) {
    doc.fontSize(14).text("Summary", { underline: true });
    doc.fontSize(12).text(resume.summary);
    doc.moveDown();
  }

  // Sections
  resume.sections.forEach((section) => {
    doc.fontSize(14).text(section.title, { underline: true });
    doc.moveDown(0.5);

    section.items.forEach((item) => {
      if (item.title) doc.fontSize(12).text(item.title, { bold: true });
      if (item.subtitle) doc.text(item.subtitle);
      if (item.date) doc.text(item.date);
      if (item.description) doc.text(item.description);

      if (item.bullets?.length) {
        item.bullets.forEach((b) => doc.text("• " + b));
      }

      doc.moveDown();
    });

    doc.moveDown();
  });

  doc.end();
  return stream;
}
