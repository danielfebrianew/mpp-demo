import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import type { MockTicket } from '@/lib/mock-ticket';
import { getTicketQrPayload } from '@/lib/mock-ticket';

function wrapText(
  text: string,
  maxWidth: number,
  widthOfText: (value: string) => number,
) {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(' ')) {
    const candidate = line ? `${line} ${word}` : word;
    if (widthOfText(candidate) <= maxWidth) line = candidate;
    else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export async function generateMockTicketPdf(ticket: MockTicket) {
  const [{ PDFDocument, StandardFonts, rgb }, QRCode] = await Promise.all([
    import('pdf-lib'),
    import('qrcode'),
  ]);
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([419.53, 595.28]);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const qrDataUrl = await QRCode.toDataURL(getTicketQrPayload(ticket), {
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 360,
  });
  const qrBytes = await fetch(qrDataUrl).then((response) =>
    response.arrayBuffer(),
  );
  const qrImage = await pdf.embedPng(qrBytes);
  const teal = rgb(0.08, 0.25, 0.22);
  const green = rgb(0.16, 0.4, 0.36);
  const gray = rgb(0.38, 0.43, 0.42);

  page.drawRectangle({
    x: 0,
    y: 478,
    width: 419.53,
    height: 117.28,
    color: teal,
  });
  page.drawText('MPP KABUPATEN WAKANDA', {
    x: 32,
    y: 557,
    size: 10,
    font: bold,
    color: rgb(1, 1, 1),
  });
  page.drawText('TIKET ANTREAN ONLINE', {
    x: 32,
    y: 528,
    size: 20,
    font: bold,
    color: rgb(1, 1, 1),
  });
  page.drawText('DEMO - BUKAN TIKET LAYANAN NYATA', {
    x: 32,
    y: 501,
    size: 9,
    font: bold,
    color: rgb(0.78, 0.91, 0.87),
  });

  page.drawText('NOMOR ANTREAN', {
    x: 32,
    y: 444,
    size: 8,
    font: bold,
    color: gray,
  });
  page.drawText(ticket.queueNumber, {
    x: 32,
    y: 396,
    size: 40,
    font: bold,
    color: teal,
  });
  page.drawText(`Kode ${ticket.ticketCode}`, {
    x: 34,
    y: 375,
    size: 10,
    font: bold,
    color: green,
  });
  page.drawImage(qrImage, { x: 282, y: 370, width: 104, height: 104 });

  const details = [
    ['Layanan', ticket.serviceName],
    ['Instansi', ticket.agencyName],
    ['Gerai', ticket.outletName],
    ['Alamat', ticket.outletAddress],
    [
      'Tanggal kunjungan',
      format(parseISO(ticket.visitDate), 'EEEE, d MMMM yyyy', { locale: id }),
    ],
    [
      'Terdaftar',
      format(new Date(ticket.registeredAt), "d MMMM yyyy, HH.mm 'WIB'", {
        locale: id,
      }),
    ],
  ] as const;
  let y = 335;
  for (const [label, value] of details) {
    page.drawText(label.toUpperCase(), {
      x: 32,
      y,
      size: 7.5,
      font: bold,
      color: gray,
    });
    y -= 15;
    const lines = wrapText(value, 350, (text) =>
      regular.widthOfTextAtSize(text, 10.5),
    );
    for (const line of lines) {
      page.drawText(line, { x: 32, y, size: 10.5, font: regular, color: teal });
      y -= 14;
    }
    y -= 10;
  }

  page.drawLine({
    start: { x: 32, y: 103 },
    end: { x: 387, y: 103 },
    thickness: 1,
    color: rgb(0.84, 0.88, 0.87),
  });
  page.drawText('Petunjuk check-in', {
    x: 32,
    y: 82,
    size: 9,
    font: bold,
    color: teal,
  });
  const instruction =
    'Datang 15 menit lebih awal, pindai QR di kiosk, lalu tunjukkan tiket ini kepada petugas.';
  const instructionLines = wrapText(instruction, 355, (text) =>
    regular.widthOfTextAtSize(text, 8.5),
  );
  instructionLines.forEach((line, index) =>
    page.drawText(line, {
      x: 32,
      y: 66 - index * 11,
      size: 8.5,
      font: regular,
      color: gray,
    }),
  );
  page.drawText(
    'Simulasi antarmuka. Tidak terhubung ke sistem antrean resmi.',
    { x: 32, y: 24, size: 7.5, font: bold, color: rgb(0.62, 0.25, 0.22) },
  );

  return {
    bytes: await pdf.save(),
    filename: `tiket-antrean-${ticket.serviceSlug}-${ticket.ticketCode.toLowerCase()}.pdf`,
  };
}
