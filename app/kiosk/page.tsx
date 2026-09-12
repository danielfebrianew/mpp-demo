import Link from 'next/link';
import {
  Accessibility,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  FileBadge2,
  HeartPulse,
  HelpCircle,
  Landmark,
  Languages,
  QrCode,
  ScanLine,
  Users,
} from 'lucide-react';
import { getScenarioData, scenarioHref } from '@/lib/mpp-data';

const kioskServices = [
  {
    slug: 'kependudukan',
    title: 'Kependudukan',
    subtitle: 'KTP-el, Kartu Keluarga, KIA, dan dokumen sipil',
    count: '6 layanan',
    icon: CreditCard,
    surface:
      'bg-[radial-gradient(ellipse_at_100%_0%,rgba(75,141,129,0.22),transparent_58%),linear-gradient(145deg,#ffffff_24%,#edf6f3_100%)]',
    iconClass: 'bg-[linear-gradient(145deg,#ffffff,#dcedea)] text-[#1e514a]',
    badge: 'Paling banyak dicari',
  },
  {
    slug: 'perizinan',
    title: 'Perizinan',
    subtitle: 'Izin usaha, profesi, bangunan, dan konsultasi',
    count: '8 layanan',
    icon: FileBadge2,
    surface:
      'bg-[radial-gradient(ellipse_at_0%_100%,rgba(75,141,129,0.16),transparent_62%),linear-gradient(135deg,#ffffff_30%,#f0f5f3_100%)]',
    iconClass: 'bg-[linear-gradient(145deg,#f8fbfa,#d7e9e4)] text-[#28665d]',
  },
  {
    slug: 'pajak-daerah',
    title: 'Pajak daerah',
    subtitle: 'PBB, pajak kendaraan, pembayaran, dan konsultasi',
    count: '5 layanan',
    icon: Building2,
    surface:
      'bg-[radial-gradient(ellipse_at_100%_100%,rgba(40,102,93,0.13),transparent_62%),linear-gradient(150deg,#ffffff_28%,#f2f6f5_100%)]',
    iconClass: 'bg-[linear-gradient(145deg,#ffffff,#dfece8)] text-[#28665d]',
  },
  {
    slug: 'kesehatan',
    title: 'Kesehatan',
    subtitle: 'Kepesertaan, izin tenaga kesehatan, dan rujukan',
    count: '3 layanan',
    icon: HeartPulse,
    surface:
      'bg-[radial-gradient(ellipse_at_0%_0%,rgba(75,141,129,0.14),transparent_58%),linear-gradient(135deg,#ffffff_34%,#edf4f2_100%)]',
    iconClass: 'bg-[linear-gradient(145deg,#ffffff,#dcedea)] text-[#1e514a]',
  },
] as const;

export default async function KioskPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string | string[];
    mode?: string | string[];
    scenario?: string | string[];
  }>;
}) {
  const query = await searchParams;
  const scenario = getScenarioData(query.scenario);
  const selectedCategory = Array.isArray(query.category)
    ? query.category[0]
    : query.category;
  const scanMode =
    (Array.isArray(query.mode) ? query.mode[0] : query.mode) === 'scan';
  const kioskQueues = [
    scenario.serviceQueues[0] + scenario.serviceQueues[1],
    scenario.serviceQueues[2] + scenario.serviceQueues[3],
    scenario.serviceQueues[4],
    scenario.serviceQueues[5],
  ];
  const kioskStats = [
    { label: 'Layanan tersedia', value: '22', note: 'dari 6 instansi' },
    {
      label: 'Loket aktif',
      value: String(scenario.totals.activeCounters),
      note: `${scenario.totals.totalCounters - scenario.totals.activeCounters} tidak melayani`,
    },
    {
      label: 'Rata-rata tunggu',
      value: String(scenario.totals.averageWait),
      suffix: 'mnt',
      note: `diperbarui ${scenario.updatedAt.replace(' WIB', '')}`,
    },
  ];
  const systemClass =
    scenario.system.tone === 'danger'
      ? 'border-red-200 bg-[linear-gradient(135deg,#fff7f7,#fee2e2)] text-red-700'
      : scenario.system.tone === 'warning'
        ? 'border-amber-200 bg-[linear-gradient(135deg,#fffcf5,#fef3c7)] text-amber-800'
        : scenario.system.tone === 'priority'
          ? 'border-[#e2c2b6] bg-[linear-gradient(135deg,#fffaf7,#f3e5df)] text-[#7d4233]'
          : 'border-[#b9d5ce] bg-[linear-gradient(135deg,#f8fcfb,#dcedea)] text-[#1e514a]';

  return (
    <main
      id="main-content"
      className="admin-dashboard min-h-dvh bg-[radial-gradient(circle_at_8%_0%,rgba(75,141,129,0.18),transparent_28%),radial-gradient(circle_at_100%_100%,rgba(40,102,93,0.12),transparent_34%),#f7f8fa] p-2 text-zinc-950 sm:p-3 lg:p-4"
    >
      <div className="mx-auto min-h-[calc(100dvh-1rem)] max-w-385 overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/92 shadow-[0_28px_90px_rgba(30,81,74,0.13),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-sm sm:min-h-[calc(100dvh-1.5rem)]">
        <header className="grid min-h-18 grid-cols-[1fr_auto] items-center gap-4 border-b border-[#d9e1df] bg-white/75 px-4 backdrop-blur-xl sm:px-6 lg:px-7">
          <Link
            href={scenarioHref('/kiosk', scenario.id)}
            className="interactive flex min-w-0 items-center gap-3 rounded-xl focus-visible:ring-2 focus-visible:ring-[#28665d]"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-[0.9rem] bg-[radial-gradient(circle_at_100%_100%,#38846f,transparent_72%),linear-gradient(135deg,#173e35,#28665d)] text-white shadow-[0_10px_24px_rgba(40,102,93,0.24)]">
              <Landmark className="size-5" strokeWidth={1.8} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold tracking-[-0.02em]">
                MPP Kabupaten Wakanda
              </span>
              <span className="block text-xs text-zinc-500">
                Kiosk layanan mandiri
              </span>
            </span>
          </Link>

          <div className="flex items-center justify-end gap-2">
            <div className="mr-1 hidden items-center gap-2 border-r border-zinc-200 pr-4 text-xs text-zinc-500 sm:flex">
              <span className="size-2 rounded-full bg-[#4b8d81] shadow-[0_0_0_4px_rgba(75,141,129,0.14)]" />
              Kiosk 01 online
            </div>
            <button
              type="button"
              className="interactive grid size-12 place-items-center rounded-2xl border border-zinc-200 bg-white/80 text-zinc-600 shadow-[inset_0_1px_0_white] hover:-translate-y-0.5 hover:border-[#b9d5ce] hover:bg-[#edf6f3] hover:text-[#1e514a]"
              aria-label="Ganti bahasa"
            >
              <Languages className="size-5" strokeWidth={1.8} />
            </button>
            <button
              type="button"
              className="interactive grid size-12 place-items-center rounded-2xl border border-zinc-200 bg-white/80 text-zinc-600 shadow-[inset_0_1px_0_white] hover:-translate-y-0.5 hover:border-[#b9d5ce] hover:bg-[#edf6f3] hover:text-[#1e514a]"
              aria-label="Mode aksesibilitas"
            >
              <Accessibility className="size-5" strokeWidth={1.8} />
            </button>
          </div>
        </header>

        <div className="px-4 pb-28 pt-4 sm:px-6 sm:pt-5 lg:px-7 lg:pb-6">
          <div className="mx-auto max-w-350">
            <section className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(30rem,0.85fr)] xl:items-end">
              <div>
                <h1 className="max-w-[17ch] text-[clamp(2.25rem,3.5vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-balance">
                  Layanan apa yang Anda butuhkan?
                </h1>
                <p className="mt-2 max-w-[65ch] text-sm leading-6 text-zinc-500 sm:text-[0.95rem]">
                  Pilih kategori, periksa detailnya, lalu ambil nomor antrean.
                  Biasanya selesai kurang dari dua menit.
                </p>
              </div>

              <div
                className="grid grid-cols-3 gap-2.5"
                aria-label="Ringkasan operasional"
              >
                {kioskStats.map((stat, index) => (
                  <article
                    key={stat.label}
                    className={`min-w-0 rounded-2xl border border-white/90 p-3.5 shadow-[0_12px_30px_rgba(40,102,93,0.08),inset_0_1px_0_white] sm:p-4 ${
                      index === 2
                        ? 'bg-[radial-gradient(circle_at_100%_0%,rgba(75,141,129,0.24),transparent_60%),linear-gradient(145deg,#ffffff,#e7f1ee)]'
                        : 'bg-[linear-gradient(145deg,#ffffff,#f1f5f4)]'
                    }`}
                  >
                    <p className="truncate text-[10px] font-medium text-zinc-500 sm:text-[11px]">
                      {stat.label}
                    </p>
                    <p className="tabular mt-1.5 text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">
                      {stat.value}
                      {'suffix' in stat ? (
                        <span className="ml-1 text-[10px] font-semibold tracking-normal text-zinc-500">
                          {stat.suffix}
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1 truncate text-[9px] text-zinc-400 sm:text-[10px]">
                      {stat.note}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_21rem]">
              <section className="overflow-hidden rounded-[1.6rem] border border-white/90 bg-[radial-gradient(ellipse_at_0%_0%,rgba(220,237,234,0.72),transparent_45%),rgba(255,255,255,0.88)] shadow-[0_20px_54px_rgba(40,102,93,0.09),inset_0_1px_0_white]">
                <header className="flex flex-col justify-between gap-3 border-b border-[#d9e1df] px-4 py-3 sm:flex-row sm:items-center sm:px-5">
                  <div>
                    <h2 className="text-lg font-semibold tracking-[-0.025em]">
                      Pilih kategori layanan
                    </h2>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {selectedCategory
                        ? `${kioskServices.find((service) => service.slug === selectedCategory)?.title ?? 'Kategori'} dipilih · lanjutkan pada tahap berikutnya.`
                        : 'Sentuh satu kartu untuk melihat pilihan layanan.'}
                    </p>
                  </div>
                  <span
                    className={`inline-flex w-fit items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold ${systemClass}`}
                  >
                    <CheckCircle2 className="size-3.5" />{' '}
                    {scenario.system.label}
                  </span>
                </header>

                <div className="grid gap-3 p-3 sm:p-4 lg:grid-cols-2">
                  {kioskServices.map((service, index) => {
                    const Icon = service.icon;
                    const queue = kioskQueues[index];
                    const isBusy = queue >= 20;
                    const isSelected = selectedCategory === service.slug;
                    const isDisrupted =
                      scenario.id === 'disruption' && index === 0;
                    const isPriority =
                      scenario.id === 'priority' && index === 0;
                    const badge = isDisrupted
                      ? 'Layanan dialihkan'
                      : isPriority
                        ? 'Pendampingan tersedia'
                        : 'badge' in service
                          ? service.badge
                          : isBusy
                            ? 'Ramai'
                            : undefined;
                    return (
                      <Link
                        key={service.title}
                        href={scenarioHref(
                          `/kiosk?category=${service.slug}`,
                          scenario.id,
                        )}
                        aria-current={isSelected ? 'step' : undefined}
                        aria-label={`Pilih kategori ${service.title}, ${queue} antrean`}
                        className={`interactive group relative flex min-h-36 flex-col overflow-hidden rounded-[1.25rem] border p-3.5 shadow-[0_10px_24px_rgba(40,102,93,0.07),inset_0_1px_0_white] outline-none hover:-translate-y-1 hover:border-[#a9cac2] hover:shadow-[0_18px_38px_rgba(40,102,93,0.15),inset_0_1px_0_white] focus-visible:ring-2 focus-visible:ring-[#28665d] ${service.surface} ${isSelected ? 'border-[#75aa9e] ring-2 ring-[#28665d]/20' : 'border-white/95'}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span
                            className={`grid size-11 place-items-center rounded-[0.9rem] border border-white/80 shadow-[0_8px_18px_rgba(40,102,93,0.08)] ${service.iconClass}`}
                          >
                            <Icon className="size-5" strokeWidth={1.8} />
                          </span>
                          {badge ? (
                            <span
                              className={`rounded-lg border px-2 py-1 text-[9px] font-semibold ${
                                isDisrupted
                                  ? 'border-red-200 bg-red-50/90 text-red-700'
                                  : isPriority
                                    ? 'border-[#e2c2b6] bg-[#f3e5df]/90 text-[#7d4233]'
                                    : isBusy && !('badge' in service)
                                      ? 'border-amber-200 bg-amber-50/90 text-amber-800'
                                      : 'border-[#b9d5ce] bg-white/72 text-[#1e514a]'
                              }`}
                            >
                              {badge}
                            </span>
                          ) : null}
                        </div>
                        <div className="mt-2.5">
                          <h3 className="text-lg font-semibold tracking-[-0.025em]">
                            {service.title}
                          </h3>
                          <p className="mt-1 max-w-[46ch] text-xs leading-5 text-zinc-500">
                            {service.subtitle}
                          </p>
                        </div>
                        <div className="mt-auto flex items-end justify-between gap-4 pt-2.5">
                          <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                            <span className="rounded-md bg-white/72 px-2 py-1 font-semibold text-zinc-700">
                              {service.count}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Users className="size-3" /> {queue} antrean
                            </span>
                          </div>
                          <span className="grid size-8 place-items-center rounded-xl bg-[#28665d] text-white shadow-[0_8px_18px_rgba(40,102,93,0.2)] transition-transform duration-200 group-hover:translate-x-0.5">
                            <ChevronRight className="size-4" />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>

              <aside className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <section className="relative overflow-hidden rounded-[1.6rem] bg-[radial-gradient(circle_at_100%_0%,rgba(75,141,129,0.82),transparent_48%),linear-gradient(145deg,#14382f,#205747_58%,#28665d)] text-white shadow-[0_22px_48px_rgba(30,81,74,0.24)]">
                  <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:linear-gradient(to_bottom_right,black,transparent_72%)]" />
                  <div className="relative p-5">
                    <div className="flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/12 text-[#dcedea] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
                        <QrCode className="size-6" strokeWidth={1.6} />
                      </span>
                      <span className="rounded-lg border border-white/20 bg-white/8 px-2.5 py-1.5 text-[10px] font-medium text-[#d5e8e0]">
                        Reservasi online
                      </span>
                    </div>
                    <h2 className="mt-5 text-xl font-semibold leading-tight tracking-[-0.035em]">
                      {scanMode
                        ? 'Pemindai siap digunakan'
                        : 'Sudah punya kode reservasi?'}
                    </h2>
                    <p className="mt-2 text-xs leading-5 text-[#c6ddd7]">
                      {scanMode
                        ? 'Arahkan kode QR dari ponsel ke pemindai kiosk.'
                        : 'Pindai QR dari ponsel untuk check-in dan cetak tiket.'}
                    </p>
                    <Link
                      href={scenarioHref(
                        scanMode ? '/kiosk' : '/kiosk?mode=scan',
                        scenario.id,
                      )}
                      className="interactive mt-4 flex min-h-12 items-center justify-between rounded-2xl bg-white px-4 text-sm font-semibold text-[#143f38] shadow-[0_12px_24px_rgba(10,42,36,0.16)] hover:-translate-y-0.5 hover:bg-[#edf6f3]"
                    >
                      {scanMode ? 'Batalkan pemindaian' : 'Pindai kode QR'}{' '}
                      <ScanLine className="size-4.5" />
                    </Link>
                  </div>
                  <div className="relative flex items-center gap-2 border-t border-white/12 bg-black/6 px-5 py-3 text-[10px] text-[#b9d5ce]">
                    <Clock3 className="size-3.5" /> Meja pindai aktif sampai
                    15.30 WIB
                  </div>
                </section>

                <section
                  id="cara-kerja"
                  className="rounded-[1.6rem] border border-white/90 bg-[radial-gradient(circle_at_100%_0%,rgba(220,237,234,0.9),transparent_64%),linear-gradient(145deg,#ffffff,#f0f5f3)] p-4 shadow-[0_16px_36px_rgba(40,102,93,0.08),inset_0_1px_0_white]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold">
                        Cara menggunakan kiosk
                      </h2>
                      <p className="mt-0.5 text-[10px] text-zinc-500">
                        Tiga langkah singkat
                      </p>
                    </div>
                    <span className="grid size-9 place-items-center rounded-xl bg-white/75 text-[#28665d] shadow-sm">
                      <HelpCircle className="size-4.5" strokeWidth={1.7} />
                    </span>
                  </div>
                  <ol className="mt-3 grid gap-1.5">
                    {[
                      'Pilih kategori layanan',
                      'Periksa dan konfirmasi data',
                      'Ambil tiket antrean',
                    ].map((step, index) => (
                      <li
                        key={step}
                        className="flex items-center gap-2.5 rounded-xl border border-white/80 bg-white/70 px-2.5 py-2 text-[11px] font-medium text-zinc-700 shadow-[inset_0_1px_0_white]"
                      >
                        <span className="tabular grid size-6 shrink-0 place-items-center rounded-lg bg-[#edf6f3] text-[9px] font-semibold text-[#1e514a]">
                          0{index + 1}
                        </span>
                        <span className="flex-1">{step}</span>
                        <ChevronRight className="size-3.5 text-zinc-400" />
                      </li>
                    ))}
                  </ol>
                </section>
              </aside>
            </section>

            <footer className="mt-4 flex flex-col justify-between gap-2 border-t border-[#d9e1df] pt-4 text-[11px] text-zinc-500 sm:flex-row sm:items-center">
              <p>Butuh bantuan? Petugas tersedia di meja informasi.</p>
              <p className="font-medium text-[#28665d]">
                Kiosk 01 · Lobi utama
              </p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
