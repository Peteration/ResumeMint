// src/app/api/pdf/route.ts
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

/**
 * PDF generation endpoint.
 * Converts HTML content sent via POST into a PDF buffer.
 */
export async function POST(req: Request) {
  try {
    const { html, filename } = await req.json();

    if (!html) {
      return NextResponse.json(
        { success: false, error: "Missing HTML content" },
        { status: 400 }
      );
    }

    // Launch browser in headless mode compatible with Netlify
    const browser = await puppeteer.launch({
      headless: true, // type-safe boolean
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    // Return PDF as base64 so Next.js API can send it
    return NextResponse.json({
      success: true,
      filename: filename || "document.pdf",
      pdfBase64: pdfBuffer.toString("base64"),
    });
  } catch (error: any) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { success: false, error: "PDF generation failed" },
      { status: 500 }
    );
  }
}
