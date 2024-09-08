// src/app/api/generate-pdf/route.js
import puppeteer from 'puppeteer';

export async function POST(req) {
  try {
    // Extract the DFD HTML from the request body
    const { dfdHtml } = await req.json();

    // Launch Puppeteer (headless browser)
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the content of the page to the DFD HTML
    await page.setContent(dfdHtml, { waitUntil: 'networkidle0' });

    // Generate the PDF
    const pdfBuffer = await page.pdf({
      format: 'A4', // Standard PDF size
      printBackground: true, // Include background colors
    });

    await browser.close();

    // Return the PDF as a response
    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="dfd-diagram.pdf"',
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new Response('Failed to generate PDF', { status: 500 });
  }
}
