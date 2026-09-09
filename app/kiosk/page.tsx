import Link from 'next/link';
import {
  Accessibility,
  ArrowUpRight,
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
  Sparkles,
} from 'lucide-react';
import { getScenarioData, scenarioHref } from '@/lib/mpp-data';

const kioskServices = [
  {
    title: 'Kependudukan',
    subtitle: 'KTP-el, Kartu Keluarga, KIA, dan dokumen sipil',
    count: '6 layanan',
    icon: CreditCard,
    iconClass: 'bg-blue-50 text-blue-700',
  },
  {
    title: 'Perizinan',
    subtitle: 'Izin usaha, profesi, bangunan, dan konsultasi',
    count: '8 layanan',
    icon: FileBadge2,
    iconClass: 'bg-violet-50 text-violet-700',
  },
  {
    title: 'Pajak daerah',
    subtitle: 'PBB, pajak kendaraan, pembayaran, dan konsultasi',
    count: '5 layanan',
    icon: Building2,
    iconClass: 'bg-orange-50 text-orange-700',
  },
  {
    title: 'Kesehatan',
    subtitle: 'Kepesertaan, izin tenaga kesehatan, dan rujukan',
    count: '3 layanan',
    icon: HeartPulse,
    iconClass: 'bg-emerald-50 text-emerald-700',
  },
] as const;

export default async function KioskPage({ searchParams }: { searchParams: Promise<{ scenario?: string | string[] }> }) {
  const query = await searchParams;
  const scenario = getScenarioData(query.scenario);
  const kioskQueues = [
    scenario.serviceQueues[0] + scenario.serviceQueues[1],
    scenario.serviceQueues[2] + scenario.serviceQueues[3],
    scenario.serviceQueues[4],
    scenario.serviceQueues[5],
  ];
  const kioskStats = [
    { label: 'Layanan tersedia', value: '22', note: 'dari 6 instansi' },
    { label: 'Loket aktif', value: String(scenario.totals.activeCounters), note: `${scenario.totals.totalCounters - scenario.totals.activeCounters} tidak melayani` },
    { label: 'Rata-rata tunggu', value: String(scenario.totals.averageWait), suffix: 'mnt', note: `diperbarui ${scenario.updatedAt.replace(' WIB', '')}` },
  ];
  const systemClass = scenario.system.tone === 'danger'
    ? 'bg-red-50 text-red-700'
    : scenario.system.tone === 'warning'
      ? 'bg-amber-50 text-amber-700'
      : 'bg-emerald-50 text-emerald-700';

  return (
    <main id="main-content" className="admin-dashboard min-h-dvh bg-[#f4f4f5] p-2 text-zinc-950 sm:p-4 lg:p-5">
      <div className="mx-auto min-h-[calc(100dvh-1rem)] max-w-385 overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-[0_28px_90px_rgba(24,24,27,0.09)] sm:min-h-[calc(100dvh-2rem)]">
        <header className="flex h-18 items-center justify-between gap-4 border-b border-zinc-200 px-4 sm:px-6 lg:px-8">
          <Link href={scenarioHref('/kiosk', scenario.id)} className="interactive flex min-w-0 items-center gap-3 rounded-xl focus-visible:ring-2 focus-visible:ring-zinc-400">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-zinc-950 text-white shadow-sm">
              <Landmark className="size-4.75" strokeWidth={1.8} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold tracking-[-0.01em]">MPP Kabupaten Wakanda</span>
              <span className="block text-xs text-zinc-500">Kiosk layanan mandiri</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-xl bg-zinc-100 p-1 lg:flex" aria-label="Navigasi kiosk">
            <Link href={scenarioHref('/kiosk', scenario.id)} aria-current="page" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-950 shadow-sm">Pilih layanan</Link>
            <Link href="#cara-kerja" className="interactive rounded-lg px-4 py-2 text-sm text-zinc-500 hover:bg-white hover:text-zinc-950">Cara kerja</Link>
            <Link href={scenarioHref('/ticket/A-023', scenario.id)} className="interactive rounded-lg px-4 py-2 text-sm text-zinc-500 hover:bg-white hover:text-zinc-950">Lacak antrean</Link>
          </nav>

          <div className="flex items-center gap-2">
            <div className="mr-1 hidden items-center gap-2 border-r border-zinc-200 pr-4 text-xs text-zinc-500 sm:flex">
              <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]" />
              Kiosk 01 online
            </div>
            <button type="button" className="interactive grid size-10 place-items-center rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950" aria-label="Ganti bahasa">
              <Languages className="size-4.5" strokeWidth={1.8} />
            </button>
            <button type="button" className="interactive grid size-10 place-items-center rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950" aria-label="Mode aksesibilitas">
              <Accessibility className="size-4.5" strokeWidth={1.8} />
            </button>
          </div>
        </header>

        <div className="p-4 pb-32 sm:p-6 sm:pb-32 lg:p-8 lg:pb-32">
          <div className="mx-auto max-w-350">
            <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_460px] xl:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-2 text-xs font-medium text-orange-700">
                  <Sparkles className="size-3.5" /> Mulai antrean baru
                </div>
                <h1 className="mt-5 max-w-[15ch] text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-balance sm:text-5xl">
                  Layanan apa yang Anda butuhkan?
                </h1>
                <p className="mt-4 max-w-[62ch] text-sm leading-6 text-zinc-500 sm:text-base">
                  Pilih kategori layanan, periksa detailnya, lalu ambil nomor antrean. Proses ini biasanya selesai kurang dari dua menit.
                </p>
              </div>

              <div className="grid grid-cols-3 divide-x divide-zinc-200 rounded-2xl border border-zinc-200 bg-zinc-50">
                {kioskStats.map((stat) => (
                  <div key={stat.label} className="min-w-0 px-3 py-4 sm:px-5">
                    <p className="truncate text-[11px] text-zinc-500 sm:text-xs">{stat.label}</p>
                    <p className="tabular mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                      {stat.value}{'suffix' in stat ? <span className="ml-1 text-xs font-medium tracking-normal text-zinc-500">{stat.suffix}</span> : null}
                    </p>
                    <p className="mt-1 hidden truncate text-[11px] text-zinc-400 sm:block">{stat.note}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white">
                <div className="flex flex-col justify-between gap-3 border-b border-zinc-200 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
                  <div>
                    <h2 className="text-lg font-semibold tracking-[-0.02em]">Pilih kategori layanan</h2>
                    <p className="mt-1 text-sm text-zinc-500">Semua layanan tersedia hari ini.</p>
                  </div>
                  <span className={`inline-flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${systemClass}`}>
                    <CheckCircle2 className="size-3.5" /> {scenario.system.label}
                  </span>
                </div>

                <div className="grid gap-3 p-3 sm:p-4 lg:grid-cols-2">
                  {kioskServices.map((service, index) => {
                    const Icon = service.icon;
                    return (
                      <Link
                        key={service.title}
                        href={scenarioHref('/ticket/A-023', scenario.id)}
                        className="interactive group flex min-h-44 flex-col rounded-2xl border border-zinc-200 bg-[#fbfbfc] p-5 outline-none hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white hover:shadow-[0_16px_36px_rgba(24,24,27,0.08)] focus-visible:ring-2 focus-visible:ring-zinc-400"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span className={`grid size-11 place-items-center rounded-xl ${service.iconClass}`}>
                            <Icon className="size-5" strokeWidth={1.8} />
                          </span>
                          <ArrowUpRight className="size-5 text-zinc-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-950" />
                        </div>
                        <div className="mt-5">
                          <h3 className="text-lg font-semibold tracking-[-0.02em]">{service.title}</h3>
                          <p className="mt-1.5 text-sm leading-5 text-zinc-500">{service.subtitle}</p>
                        </div>
                        <div className="mt-auto flex items-center gap-2 pt-5 text-xs text-zinc-500">
                          <span className="rounded-md bg-zinc-100 px-2 py-1 font-medium text-zinc-700">{service.count}</span>
                          <span>•</span>
                          <span>{kioskQueues[index]} antrean</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <aside className="space-y-5">
                <div className="overflow-hidden rounded-3xl bg-zinc-950 text-white shadow-[0_22px_48px_rgba(24,24,27,0.18)]">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-orange-300">
                        <QrCode className="size-6" strokeWidth={1.6} />
                      </span>
                      <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-zinc-300">Reservasi online</span>
                    </div>
                    <h2 className="mt-7 text-2xl font-semibold tracking-[-0.035em]">Sudah punya kode reservasi?</h2>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">Pindai QR dari ponsel untuk check-in dan cetak tiket tanpa memilih layanan lagi.</p>
                    <Link href={scenarioHref('/ticket/A-023', scenario.id)} className="interactive mt-6 flex min-h-12 items-center justify-between rounded-xl bg-white px-4 text-sm font-semibold text-zinc-950 hover:bg-orange-50">
                      Pindai kode QR <ScanLine className="size-4.5" />
                    </Link>
                  </div>
                  <div className="flex items-center gap-3 border-t border-white/10 bg-white/4 px-6 py-4 text-xs text-zinc-400">
                    <Clock3 className="size-4 text-zinc-500" /> Meja pindai aktif sampai 15.30 WIB
                  </div>
                </div>

                <div id="cara-kerja" className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold">Cara menggunakan kiosk</h2>
                      <p className="mt-1 text-xs text-zinc-500">Tiga langkah singkat</p>
                    </div>
                    <HelpCircle className="size-5 text-zinc-400" strokeWidth={1.7} />
                  </div>
                  <ol className="mt-5 space-y-2">
                    {['Pilih kategori layanan', 'Periksa dan konfirmasi data', 'Ambil tiket antrean'].map((step, index) => (
                      <li key={step} className="flex items-center gap-3 rounded-xl bg-white px-3 py-3 text-sm text-zinc-700">
                        <span className="tabular grid size-7 shrink-0 place-items-center rounded-lg bg-zinc-100 text-xs font-semibold text-zinc-600">0{index + 1}</span>
                        <span className="flex-1">{step}</span>
                        <ChevronRight className="size-4 text-zinc-300" />
                      </li>
                    ))}
                  </ol>
                </div>
              </aside>
            </section>

            <footer className="mt-6 flex flex-col justify-between gap-3 border-t border-zinc-200 pt-5 text-xs text-zinc-500 sm:flex-row sm:items-center">
              <p>Butuh bantuan? Petugas layanan tersedia di meja informasi.</p>
              <div className="flex gap-4"><Link href="/" className="interactive hover:text-zinc-950">Portal warga</Link><Link href="/admin" className="interactive hover:text-zinc-950">Pusat admin</Link></div>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
