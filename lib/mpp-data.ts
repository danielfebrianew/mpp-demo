export type Scenario = 'normal' | 'waiting' | 'busy' | 'called' | 'priority' | 'disruption';

export const scenarios: { id: Scenario; label: string; description: string }[] = [
  { id: 'normal', label: 'Operasional normal', description: 'Beban antrean dan seluruh perangkat dalam kondisi wajar.' },
  { id: 'waiting', label: 'Tiket sedang menunggu', description: 'Tiket A-023 sudah check-in dan menunggu empat antrean.' },
  { id: 'busy', label: 'Antrean pagi ramai', description: 'Lonjakan kedatangan membuat waktu tunggu melewati target.' },
  { id: 'called', label: 'Nomor sedang dipanggil', description: 'Tiket A-023 dipanggil bersamaan di operator, display, dan HP.' },
  { id: 'priority', label: 'Layanan prioritas', description: 'Warga prioritas mendapat pendampingan dan urutan khusus.' },
  { id: 'disruption', label: 'Gangguan satu layanan', description: 'Loket 04 terganggu dan tiket dialihkan ke loket cadangan.' },
];

export const agencies = [
  { id: 'disdukcapil', name: 'Disdukcapil', description: 'Dokumen kependudukan dan pencatatan sipil.', serviceCount: 4 },
  { id: 'dpmptsp', name: 'DPMPTSP', description: 'Perizinan usaha dan konsultasi investasi.', serviceCount: 5 },
  { id: 'bapenda', name: 'Bapenda', description: 'Pajak daerah, PBB, dan konsultasi pembayaran.', serviceCount: 3 },
  { id: 'dinkes', name: 'Dinas Kesehatan', description: 'Izin praktik dan fasilitas kesehatan.', serviceCount: 3 },
  { id: 'bpjs', name: 'BPJS Kesehatan', description: 'Kepesertaan dan informasi jaminan kesehatan.', serviceCount: 4 },
  { id: 'helpdesk', name: 'Helpdesk MPP', description: 'Informasi, pengaduan, dan pendampingan digital.', serviceCount: 3 },
] as const;

export const popularServices = [
  { slug: 'perekaman-ktp', name: 'Perekaman KTP-el', agency: 'Disdukcapil' },
  { slug: 'perubahan-kartu-keluarga', name: 'Perubahan Kartu Keluarga', agency: 'Disdukcapil' },
  { slug: 'konsultasi-nib', name: 'Konsultasi NIB', agency: 'DPMPTSP' },
  { slug: 'pajak-bumi-bangunan', name: 'Pajak Bumi & Bangunan', agency: 'Bapenda' },
] as const;

export const portalStats = [
  { value: '42', label: 'sedang menunggu' },
  { value: '8', label: 'sedang dilayani' },
  { value: '137', label: 'selesai hari ini' },
] as const;

export const services = [
  { slug: 'perekaman-ktp', name: 'Perekaman KTP-el', agency: 'Disdukcapil', agencyId: 'disdukcapil', code: 'A', duration: '12 menit', queue: 14, zone: 'Zona A', floor: 'Lantai 1', fee: 'Gratis', requirement: ['Kartu Keluarga asli', 'Surat pengantar bila ada perubahan data', 'Pemohon hadir untuk perekaman biometrik'] },
  { slug: 'perubahan-kartu-keluarga', name: 'Perubahan Kartu Keluarga', agency: 'Disdukcapil', agencyId: 'disdukcapil', code: 'A', duration: '18 menit', queue: 9, zone: 'Zona A', floor: 'Lantai 1', fee: 'Gratis', requirement: ['Kartu Keluarga lama', 'Dokumen pendukung perubahan', 'Formulir permohonan'] },
  { slug: 'konsultasi-nib', name: 'Konsultasi NIB', agency: 'DPMPTSP', agencyId: 'dpmptsp', code: 'B', duration: '20 menit', queue: 7, zone: 'Zona B', floor: 'Lantai 2', fee: 'Gratis', requirement: ['KTP penanggung jawab', 'NPWP bila tersedia', 'Data bidang usaha'] },
  { slug: 'izin-praktik-tenaga-kesehatan', name: 'Izin Praktik Tenaga Kesehatan', agency: 'Dinas Kesehatan', agencyId: 'dinkes', code: 'B', duration: '25 menit', queue: 4, zone: 'Zona B', floor: 'Lantai 2', fee: 'Gratis', requirement: ['STR aktif', 'Surat rekomendasi organisasi profesi', 'Dokumen tempat praktik'] },
  { slug: 'pajak-bumi-bangunan', name: 'Pajak Bumi & Bangunan', agency: 'Bapenda', agencyId: 'bapenda', code: 'C', duration: '10 menit', queue: 5, zone: 'Zona C', floor: 'Lantai 1', fee: 'Sesuai ketetapan', requirement: ['Nomor objek pajak', 'KTP pemohon', 'SPPT tahun berjalan'] },
  { slug: 'kepesertaan-bpjs', name: 'Perubahan Data Kepesertaan', agency: 'BPJS Kesehatan', agencyId: 'bpjs', code: 'D', duration: '15 menit', queue: 3, zone: 'Zona C', floor: 'Lantai 1', fee: 'Gratis', requirement: ['Kartu peserta', 'KTP dan Kartu Keluarga', 'Dokumen pendukung perubahan'] },
] as const;

export const counters = [
  { id: '01', label: 'Loket 01', zone: 'Zona A', service: 'Perekaman KTP-el', operator: 'Sinta Rahma', status: 'Melayani', ticket: 'A-021', wait: 11 },
  { id: '02', label: 'Loket 02', zone: 'Zona A', service: 'Dokumen kependudukan', operator: 'Raka Aditya', status: 'Melayani', ticket: 'A-022', wait: 13 },
  { id: '03', label: 'Loket 03', zone: 'Zona B', service: 'Konsultasi perizinan', operator: 'Dewi Lestari', status: 'Melayani', ticket: 'B-014', wait: 16 },
  { id: '04', label: 'Loket 04', zone: 'Zona A', service: 'Perekaman KTP-el', operator: 'Maya Putri', status: 'Siap memanggil', ticket: 'A-023', wait: 9 },
  { id: '05', label: 'Loket 05', zone: 'Zona C', service: 'Pajak daerah', operator: 'Bagus Wicaksono', status: 'Istirahat', ticket: '-', wait: 8 },
  { id: '06', label: 'Loket 06', zone: 'Zona C', service: 'BPJS Kesehatan', operator: 'Nadia Sari', status: 'Melayani', ticket: 'D-008', wait: 7 },
] as const;

export const queueRows = [
  { number: 'A-023', service: 'Perekaman KTP-el', category: 'Reguler', time: '09.10', status: 'Dipanggil' },
  { number: 'P-003', service: 'Perekaman KTP-el', category: 'Prioritas', time: '09.12', status: 'Menunggu' },
  { number: 'A-024', service: 'Perekaman KTP-el', category: 'Reguler', time: '09.14', status: 'Menunggu' },
  { number: 'A-025', service: 'Perubahan Kartu Keluarga', category: 'Reguler', time: '09.16', status: 'Menunggu' },
  { number: 'B-015', service: 'Konsultasi NIB', category: 'Reservasi', time: '09.20', status: 'Menunggu' },
] as const;

export type ScenarioTone = 'success' | 'warning' | 'danger' | 'priority';

export type ScenarioQueueRow = {
  number: string;
  service: string;
  category: string;
  time: string;
  status: string;
};

export type ScenarioSnapshot = {
  id: Scenario;
  label: string;
  description: string;
  updatedAt: string;
  system: { label: string; detail: string; tone: ScenarioTone };
  totals: {
    waiting: number;
    serving: number;
    completed: number;
    averageWait: number;
    averageService: number;
    activeCounters: number;
    totalCounters: number;
    sla: number;
    staffOnDuty: number;
    staffTotal: number;
    devicesOnline: number;
    devicesTotal: number;
  };
  serviceQueues: readonly number[];
  ticket: {
    label: string;
    detail: string;
    ahead: string;
    aheadCount: string;
    estimate: string;
    destination: string;
    category: string;
    issuedAt: string;
    alert: boolean;
    called: boolean;
  };
  currentCall: {
    number: string;
    service: string;
    counter: string;
    zone: string;
    floor: string;
    checkIn: string;
    wait: string;
    callLabel: string;
    callDetail: string;
  };
  queueRows: readonly ScenarioQueueRow[];
  hourlyLoad: readonly number[];
  serviceLoad: readonly { name: string; wait: number; queue: number; load: number }[];
  counterOverrides: Readonly<Record<string, { status?: string; ticket?: string; wait?: number }>>;
  volumeData: readonly { time: string; checkin: number; selesai: number }[];
  adminActivity: readonly { time: string; title: string; actor: string; context: string }[];
};

const sharedRecentActivity = [
  { time: '08.42', title: 'Loket 05 masuk status istirahat', actor: 'Bagus Wicaksono', context: 'Zona C' },
  { time: '08.05', title: 'Perangkat Kiosk 02 kembali online', actor: 'Sistem perangkat', context: 'Lobi utama' },
  { time: '07.48', title: 'Jadwal layanan hari ini dibuka', actor: 'Maya Putri', context: 'Seluruh zona' },
] as const;

const scenarioSnapshots: Record<Scenario, ScenarioSnapshot> = {
  normal: {
    id: 'normal',
    label: 'Operasional normal',
    description: 'Beban antrean dan seluruh perangkat dalam kondisi wajar.',
    updatedAt: '09.24.18 WIB',
    system: { label: 'Operasional normal', detail: 'Seluruh layanan menerima antrean', tone: 'success' },
    totals: { waiting: 42, serving: 8, completed: 137, averageWait: 14, averageService: 11, activeCounters: 5, totalCounters: 6, sla: 92, staffOnDuty: 18, staffTotal: 21, devicesOnline: 9, devicesTotal: 10 },
    serviceQueues: [14, 9, 7, 4, 5, 3],
    ticket: { label: 'Menunggu', detail: 'Check-in berhasil pukul 09.10', ahead: '4 antrean di depan', aheadCount: '4 orang', estimate: '18 menit', destination: 'Loket 04', category: 'Reguler', issuedAt: '09.10', alert: false, called: false },
    currentCall: { number: 'A-020', service: 'Perekaman KTP-el', counter: 'Loket 04', zone: 'A', floor: '01', checkIn: '09.02', wait: '12 menit', callLabel: 'Nomor sedang dipanggil', callDetail: 'Panggilan pertama' },
    queueRows: [
      { number: 'A-023', service: 'Perekaman KTP-el', category: 'Reguler', time: '09.10', status: 'Menunggu' },
      { number: 'P-003', service: 'Perekaman KTP-el', category: 'Prioritas', time: '09.12', status: 'Menunggu' },
      { number: 'A-024', service: 'Perekaman KTP-el', category: 'Reguler', time: '09.14', status: 'Menunggu' },
      { number: 'A-025', service: 'Perubahan Kartu Keluarga', category: 'Reguler', time: '09.16', status: 'Menunggu' },
      { number: 'B-015', service: 'Konsultasi NIB', category: 'Reservasi', time: '09.20', status: 'Menunggu' },
    ],
    hourlyLoad: [32, 58, 84, 72, 60, 48, 66, 78, 54],
    serviceLoad: [
      { name: 'Perekaman KTP-el', wait: 18, queue: 14, load: 88 },
      { name: 'Konsultasi perizinan', wait: 16, queue: 7, load: 71 },
      { name: 'Pajak daerah', wait: 8, queue: 5, load: 43 },
      { name: 'BPJS Kesehatan', wait: 7, queue: 3, load: 31 },
    ],
    counterOverrides: { '04': { status: 'Memanggil', ticket: 'A-020', wait: 12 } },
    volumeData: [
      { time: '07.00', checkin: 18, selesai: 12 }, { time: '08.00', checkin: 36, selesai: 24 }, { time: '09.00', checkin: 63, selesai: 42 },
      { time: '10.00', checkin: 51, selesai: 47 }, { time: '11.00', checkin: 44, selesai: 40 }, { time: '12.00', checkin: 29, selesai: 34 },
      { time: '13.00', checkin: 48, selesai: 39 }, { time: '14.00', checkin: 40, selesai: 36 }, { time: '15.00', checkin: 21, selesai: 27 },
    ],
    adminActivity: [{ time: '09.18', title: 'Kuota Perekaman KTP-el diperbarui', actor: 'Nadia Puspita', context: 'Disdukcapil' }, ...sharedRecentActivity],
  },
  waiting: {
    id: 'waiting',
    label: 'Tiket sedang menunggu',
    description: 'Tiket A-023 sudah check-in dan menunggu empat antrean.',
    updatedAt: '09.21.08 WIB',
    system: { label: 'Tiket A-023 menunggu', detail: 'Empat antrean sebelum giliran warga', tone: 'success' },
    totals: { waiting: 38, serving: 7, completed: 142, averageWait: 12, averageService: 10, activeCounters: 5, totalCounters: 6, sla: 94, staffOnDuty: 18, staffTotal: 21, devicesOnline: 9, devicesTotal: 10 },
    serviceQueues: [12, 8, 6, 4, 5, 3],
    ticket: { label: 'Menunggu', detail: 'Check-in berhasil pukul 09.10', ahead: '4 antrean di depan', aheadCount: '4 orang', estimate: '18 menit', destination: 'Loket 04', category: 'Reguler', issuedAt: '09.10', alert: false, called: false },
    currentCall: { number: 'A-021', service: 'Perekaman KTP-el', counter: 'Loket 04', zone: 'A', floor: '01', checkIn: '09.04', wait: '13 menit', callLabel: 'Nomor sedang dipanggil', callDetail: 'Panggilan kedua' },
    queueRows: [
      { number: 'A-023', service: 'Perekaman KTP-el', category: 'Reguler', time: '09.10', status: 'Menunggu' },
      { number: 'P-003', service: 'Perekaman KTP-el', category: 'Prioritas', time: '09.12', status: 'Menunggu' },
      { number: 'A-024', service: 'Perekaman KTP-el', category: 'Reguler', time: '09.14', status: 'Menunggu' },
      { number: 'A-025', service: 'Perubahan Kartu Keluarga', category: 'Reguler', time: '09.16', status: 'Menunggu' },
      { number: 'B-015', service: 'Konsultasi NIB', category: 'Reservasi', time: '09.20', status: 'Menunggu' },
    ],
    hourlyLoad: [28, 51, 76, 68, 57, 43, 61, 70, 49],
    serviceLoad: [
      { name: 'Perekaman KTP-el', wait: 16, queue: 12, load: 79 }, { name: 'Konsultasi perizinan', wait: 14, queue: 6, load: 63 },
      { name: 'Pajak daerah', wait: 8, queue: 5, load: 42 }, { name: 'BPJS Kesehatan', wait: 7, queue: 3, load: 30 },
    ],
    counterOverrides: { '04': { status: 'Memanggil', ticket: 'A-021', wait: 13 } },
    volumeData: [
      { time: '07.00', checkin: 17, selesai: 13 }, { time: '08.00', checkin: 33, selesai: 27 }, { time: '09.00', checkin: 56, selesai: 46 },
      { time: '10.00', checkin: 48, selesai: 45 }, { time: '11.00', checkin: 41, selesai: 39 }, { time: '12.00', checkin: 27, selesai: 32 },
      { time: '13.00', checkin: 43, selesai: 41 }, { time: '14.00', checkin: 36, selesai: 38 }, { time: '15.00', checkin: 19, selesai: 25 },
    ],
    adminActivity: [{ time: '09.10', title: 'Tiket A-023 berhasil check-in', actor: 'Kiosk 01', context: 'Zona A' }, ...sharedRecentActivity],
  },
  busy: {
    id: 'busy',
    label: 'Antrean pagi ramai',
    description: 'Lonjakan kedatangan membuat waktu tunggu melewati target.',
    updatedAt: '09.37.42 WIB',
    system: { label: 'Antrean lebih ramai', detail: 'Kedatangan 41% di atas pola harian', tone: 'warning' },
    totals: { waiting: 87, serving: 9, completed: 96, averageWait: 31, averageService: 15, activeCounters: 6, totalCounters: 6, sla: 74, staffOnDuty: 20, staffTotal: 21, devicesOnline: 10, devicesTotal: 10 },
    serviceQueues: [29, 18, 15, 9, 10, 6],
    ticket: { label: 'Antrean ramai', detail: 'Waktu tunggu lebih panjang dari biasanya', ahead: '11 antrean di depan', aheadCount: '11 orang', estimate: '43 menit', destination: 'Loket 04', category: 'Reguler', issuedAt: '09.10', alert: true, called: false },
    currentCall: { number: 'A-031', service: 'Perekaman KTP-el', counter: 'Loket 04', zone: 'A', floor: '01', checkIn: '08.58', wait: '34 menit', callLabel: 'Nomor sedang dipanggil', callDetail: 'Panggilan kedua' },
    queueRows: [
      { number: 'A-032', service: 'Perekaman KTP-el', category: 'Reguler', time: '09.01', status: 'Menunggu' },
      { number: 'P-006', service: 'Perekaman KTP-el', category: 'Prioritas', time: '09.03', status: 'Menunggu' },
      { number: 'A-033', service: 'Perubahan Kartu Keluarga', category: 'Reguler', time: '09.04', status: 'Menunggu' },
      { number: 'A-034', service: 'Perekaman KTP-el', category: 'Reguler', time: '09.06', status: 'Menunggu' },
      { number: 'B-024', service: 'Konsultasi NIB', category: 'Reservasi', time: '09.08', status: 'Menunggu' },
    ],
    hourlyLoad: [44, 79, 98, 96, 91, 72, 88, 94, 68],
    serviceLoad: [
      { name: 'Perekaman KTP-el', wait: 43, queue: 29, load: 100 }, { name: 'Konsultasi perizinan', wait: 36, queue: 15, load: 93 },
      { name: 'Pajak daerah', wait: 24, queue: 10, load: 78 }, { name: 'BPJS Kesehatan', wait: 19, queue: 6, load: 64 },
    ],
    counterOverrides: { '04': { status: 'Melayani', ticket: 'A-031', wait: 34 }, '05': { status: 'Melayani', ticket: 'C-017', wait: 24 } },
    volumeData: [
      { time: '07.00', checkin: 29, selesai: 11 }, { time: '08.00', checkin: 58, selesai: 27 }, { time: '09.00', checkin: 91, selesai: 44 },
      { time: '10.00', checkin: 83, selesai: 51 }, { time: '11.00', checkin: 74, selesai: 48 }, { time: '12.00', checkin: 46, selesai: 37 },
      { time: '13.00', checkin: 69, selesai: 45 }, { time: '14.00', checkin: 61, selesai: 42 }, { time: '15.00', checkin: 32, selesai: 29 },
    ],
    adminActivity: [{ time: '09.35', title: 'Seluruh loket cadangan diaktifkan', actor: 'Nadia Puspita', context: 'Seluruh zona' }, { time: '09.28', title: 'Ambang antrean Zona A terlampaui', actor: 'Sistem antrean', context: 'Zona A' }, ...sharedRecentActivity.slice(1)],
  },
  called: {
    id: 'called',
    label: 'Nomor sedang dipanggil',
    description: 'Tiket A-023 dipanggil bersamaan di operator, display, dan HP.',
    updatedAt: '09.24.36 WIB',
    system: { label: 'A-023 sedang dipanggil', detail: 'Pemegang tiket menuju Loket 04', tone: 'success' },
    totals: { waiting: 36, serving: 8, completed: 149, averageWait: 11, averageService: 10, activeCounters: 5, totalCounters: 6, sla: 94, staffOnDuty: 18, staffTotal: 21, devicesOnline: 9, devicesTotal: 10 },
    serviceQueues: [11, 7, 6, 3, 5, 4],
    ticket: { label: 'Dipanggil', detail: 'Silakan menuju Loket 04 sekarang', ahead: 'Panggilan pertama', aheadCount: '0 orang', estimate: 'Sekarang', destination: 'Loket 04', category: 'Reguler', issuedAt: '09.10', alert: false, called: true },
    currentCall: { number: 'A-023', service: 'Perekaman KTP-el', counter: 'Loket 04', zone: 'A', floor: '01', checkIn: '09.10', wait: '14 menit', callLabel: 'Nomor sedang dipanggil', callDetail: 'Panggilan pertama' },
    queueRows: [
      { number: 'A-023', service: 'Perekaman KTP-el', category: 'Reguler', time: '09.10', status: 'Dipanggil' },
      { number: 'P-003', service: 'Perekaman KTP-el', category: 'Prioritas', time: '09.12', status: 'Menunggu' },
      { number: 'A-024', service: 'Perekaman KTP-el', category: 'Reguler', time: '09.14', status: 'Menunggu' },
      { number: 'A-025', service: 'Perubahan Kartu Keluarga', category: 'Reguler', time: '09.16', status: 'Menunggu' },
      { number: 'B-015', service: 'Konsultasi NIB', category: 'Reservasi', time: '09.20', status: 'Menunggu' },
    ],
    hourlyLoad: [30, 55, 80, 69, 58, 44, 63, 74, 51],
    serviceLoad: [
      { name: 'Perekaman KTP-el', wait: 14, queue: 11, load: 73 }, { name: 'Konsultasi perizinan', wait: 13, queue: 6, load: 59 },
      { name: 'Pajak daerah', wait: 8, queue: 5, load: 41 }, { name: 'BPJS Kesehatan', wait: 8, queue: 4, load: 36 },
    ],
    counterOverrides: { '04': { status: 'Memanggil', ticket: 'A-023', wait: 14 } },
    volumeData: [
      { time: '07.00', checkin: 18, selesai: 14 }, { time: '08.00', checkin: 35, selesai: 28 }, { time: '09.00', checkin: 58, selesai: 49 },
      { time: '10.00', checkin: 47, selesai: 48 }, { time: '11.00', checkin: 39, selesai: 42 }, { time: '12.00', checkin: 26, selesai: 35 },
      { time: '13.00', checkin: 41, selesai: 44 }, { time: '14.00', checkin: 34, selesai: 39 }, { time: '15.00', checkin: 18, selesai: 28 },
    ],
    adminActivity: [{ time: '09.24', title: 'Tiket A-023 dipanggil ke Loket 04', actor: 'Maya Putri', context: 'Zona A' }, ...sharedRecentActivity],
  },
  priority: {
    id: 'priority',
    label: 'Layanan prioritas',
    description: 'Warga prioritas mendapat pendampingan dan urutan khusus.',
    updatedAt: '09.26.14 WIB',
    system: { label: 'Pendampingan prioritas aktif', detail: 'Petugas lobi telah menerima notifikasi', tone: 'priority' },
    totals: { waiting: 45, serving: 8, completed: 132, averageWait: 15, averageService: 12, activeCounters: 5, totalCounters: 6, sla: 89, staffOnDuty: 19, staffTotal: 21, devicesOnline: 9, devicesTotal: 10 },
    serviceQueues: [16, 10, 7, 4, 5, 3],
    ticket: { label: 'Prioritas', detail: 'Petugas pendamping telah diinformasikan', ahead: '1 antrean prioritas di depan', aheadCount: '1 orang', estimate: '7 menit', destination: 'Loket 04', category: 'Prioritas', issuedAt: '09.12', alert: false, called: false },
    currentCall: { number: 'P-002', service: 'Perekaman KTP-el', counter: 'Loket 04', zone: 'A', floor: '01', checkIn: '09.08', wait: '9 menit', callLabel: 'Panggilan prioritas', callDetail: 'Petugas pendamping bersiap' },
    queueRows: [
      { number: 'P-002', service: 'Perekaman KTP-el', category: 'Prioritas', time: '09.08', status: 'Dipanggil' },
      { number: 'A-023', service: 'Perekaman KTP-el', category: 'Prioritas', time: '09.12', status: 'Menunggu' },
      { number: 'A-024', service: 'Perekaman KTP-el', category: 'Reguler', time: '09.14', status: 'Menunggu' },
      { number: 'A-025', service: 'Perubahan Kartu Keluarga', category: 'Reguler', time: '09.16', status: 'Menunggu' },
      { number: 'B-015', service: 'Konsultasi NIB', category: 'Reservasi', time: '09.20', status: 'Menunggu' },
    ],
    hourlyLoad: [34, 60, 82, 74, 63, 48, 67, 76, 55],
    serviceLoad: [
      { name: 'Perekaman KTP-el', wait: 19, queue: 16, load: 91 }, { name: 'Konsultasi perizinan', wait: 16, queue: 7, load: 69 },
      { name: 'Pajak daerah', wait: 9, queue: 5, load: 44 }, { name: 'BPJS Kesehatan', wait: 7, queue: 3, load: 31 },
    ],
    counterOverrides: { '04': { status: 'Pendampingan', ticket: 'P-002', wait: 9 } },
    volumeData: [
      { time: '07.00', checkin: 19, selesai: 12 }, { time: '08.00', checkin: 39, selesai: 25 }, { time: '09.00', checkin: 65, selesai: 43 },
      { time: '10.00', checkin: 54, selesai: 46 }, { time: '11.00', checkin: 45, selesai: 41 }, { time: '12.00', checkin: 31, selesai: 34 },
      { time: '13.00', checkin: 49, selesai: 40 }, { time: '14.00', checkin: 41, selesai: 37 }, { time: '15.00', checkin: 22, selesai: 27 },
    ],
    adminActivity: [{ time: '09.25', title: 'Pendamping prioritas ditugaskan ke Zona A', actor: 'Nadia Puspita', context: 'Loket 04' }, ...sharedRecentActivity],
  },
  disruption: {
    id: 'disruption',
    label: 'Gangguan satu layanan',
    description: 'Loket 04 terganggu dan tiket dialihkan ke loket cadangan.',
    updatedAt: '09.31.52 WIB',
    system: { label: 'Perekaman KTP-el terganggu', detail: 'Loket 04 offline, antrean dialihkan', tone: 'danger' },
    totals: { waiting: 51, serving: 6, completed: 118, averageWait: 26, averageService: 17, activeCounters: 4, totalCounters: 6, sla: 68, staffOnDuty: 17, staffTotal: 21, devicesOnline: 8, devicesTotal: 10 },
    serviceQueues: [24, 13, 7, 0, 5, 2],
    ticket: { label: 'Dialihkan', detail: 'Loket 04 mengalami gangguan perangkat', ahead: 'Menunggu konfirmasi Loket 02', aheadCount: '6 orang', estimate: '28 menit', destination: 'Loket 02', category: 'Reguler', issuedAt: '09.10', alert: true, called: false },
    currentCall: { number: 'A-022', service: 'Dokumen kependudukan', counter: 'Loket 02', zone: 'A', floor: '01', checkIn: '09.06', wait: '21 menit', callLabel: 'Panggilan dialihkan', callDetail: 'Loket 04 sedang offline' },
    queueRows: [
      { number: 'A-023', service: 'Perekaman KTP-el', category: 'Reguler', time: '09.10', status: 'Dialihkan' },
      { number: 'P-003', service: 'Perekaman KTP-el', category: 'Prioritas', time: '09.12', status: 'Pendampingan' },
      { number: 'A-024', service: 'Perekaman KTP-el', category: 'Reguler', time: '09.14', status: 'Tertunda' },
      { number: 'A-025', service: 'Perubahan Kartu Keluarga', category: 'Reguler', time: '09.16', status: 'Menunggu' },
      { number: 'B-015', service: 'Konsultasi NIB', category: 'Reservasi', time: '09.20', status: 'Menunggu' },
    ],
    hourlyLoad: [31, 56, 86, 79, 73, 60, 82, 89, 67],
    serviceLoad: [
      { name: 'Perekaman KTP-el', wait: 42, queue: 24, load: 100 }, { name: 'Konsultasi perizinan', wait: 17, queue: 7, load: 70 },
      { name: 'Pajak daerah', wait: 10, queue: 5, load: 46 }, { name: 'BPJS Kesehatan', wait: 6, queue: 2, load: 26 },
    ],
    counterOverrides: { '02': { status: 'Melayani', ticket: 'A-022', wait: 21 }, '04': { status: 'Gangguan', ticket: '-', wait: 0 } },
    volumeData: [
      { time: '07.00', checkin: 18, selesai: 12 }, { time: '08.00', checkin: 37, selesai: 24 }, { time: '09.00', checkin: 66, selesai: 39 },
      { time: '10.00', checkin: 57, selesai: 38 }, { time: '11.00', checkin: 49, selesai: 35 }, { time: '12.00', checkin: 33, selesai: 29 },
      { time: '13.00', checkin: 51, selesai: 32 }, { time: '14.00', checkin: 46, selesai: 30 }, { time: '15.00', checkin: 25, selesai: 22 },
    ],
    adminActivity: [{ time: '09.31', title: 'Loket 04 kehilangan koneksi perangkat', actor: 'Sistem perangkat', context: 'Zona A' }, { time: '09.33', title: 'Antrean KTP-el dialihkan ke Loket 02', actor: 'Nadia Puspita', context: 'Disdukcapil' }, ...sharedRecentActivity.slice(1)],
  },
};

export function parseScenario(value: string | string[] | null | undefined): Scenario {
  const candidate = Array.isArray(value) ? value[0] : value;
  return scenarios.some((scenario) => scenario.id === candidate) ? candidate as Scenario : 'normal';
}

export function getScenarioData(value: string | string[] | null | undefined): ScenarioSnapshot {
  return scenarioSnapshots[parseScenario(value)];
}

export function getScenarioServices(value: string | string[] | null | undefined) {
  const snapshot = getScenarioData(value);
  return services.map((service, index) => ({ ...service, queue: snapshot.serviceQueues[index] ?? service.queue }));
}

export function getScenarioCounters(value: string | string[] | null | undefined) {
  const snapshot = getScenarioData(value);
  return counters.map((counter) => ({ ...counter, ...snapshot.counterOverrides[counter.id] }));
}

export function scenarioHref(href: string, scenario: Scenario) {
  const separator = href.includes('?') ? '&' : '?';
  return `${href}${separator}scenario=${scenario}`;
}

export function getScenarioCopy(scenario: string) {
  return scenarios.find((item) => item.id === scenario)?.label ?? scenarios[0].label;
}
