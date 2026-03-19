export async function extractXmlFromPdf(pdfBuffer: ArrayBuffer): Promise<string> {
  const pdfjs = await import('pdfjs-dist');
  
  // Use local worker for PWA/Offline support
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).href;

  try {
    const doc = await pdfjs.getDocument({ data: pdfBuffer }).promise;
    const attachments = await doc.getAttachments();
    
    if (!attachments) throw new Error('NO_ATTACHMENTS');

    const RELEVANT = ['factur-x.xml', 'zugferd-invoice.xml', 'xrechnung.xml', 'basic-wl.xml'];
    for (const name of RELEVANT) {
      if (attachments[name]) {
        return new TextDecoder().decode(attachments[name].content);
      }
    }

    throw new Error('NO_ZUGFERD_XML');
  } catch (err: any) {
    if (err.message === 'NO_ZUGFERD_XML' || err.message === 'NO_ATTACHMENTS') throw err;
    console.error('PDF.js:', err);
    throw new Error('PDF_LOAD_FAILED');
  }
}
