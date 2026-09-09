# MPP Kabupaten Wakanda

Prototype read-only untuk alur pelayanan Mal Pelayanan Publik Kabupaten Wakanda. Aplikasi ini memperlihatkan perjalanan warga dari portal dan kiosk hingga tiket digital, serta layar operasional untuk operator, display antrean, supervisor, dan admin.

## Fitur

- Portal warga dan direktori layanan
- Kiosk untuk mengambil nomor antrean
- Tiket digital yang dapat diakses melalui QR
- Layar operator loket dan display panggilan
- Dashboard supervisor dan admin
- Enam snapshot skenario: normal, tiket menunggu, antrean ramai, nomor dipanggil, layanan prioritas, dan gangguan layanan

Skenario dipilih lewat floating navigator di kanan bawah. Data antrean, tiket, loket, metrik, dan aktivitas admin akan berubah bersama sesuai skenario yang aktif.

## Menjalankan secara lokal

Prasyarat: Node.js 22 atau lebih baru dan pnpm 11.

```bash
pnpm install
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Perintah penting

```bash
pnpm lint
pnpm build
pnpm start
```

## Stack

- Next.js App Router
- React 19 dan TypeScript
- Tailwind CSS 4
- shadcn/ui, Lucide, Motion, dan Recharts

## Catatan

Ini adalah prototype demo. Tidak ada data warga yang dikirim, disimpan, atau dihubungkan ke layanan pemerintah.
