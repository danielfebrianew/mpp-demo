import Link from 'next/link';
import {
  ArrowRightLeft,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Landmark,
  Megaphone,
  MoreHorizontal,
  Pause,
  RotateCcw,
  Search,
  SkipForward,
  Timer,
  UserRound,
  UsersRound,
} from 'lucide-react';
import { getScenarioData, scenarioHref } from '@/lib/mpp-data';

const actionButtons = [
  { label: 'Panggil ulang', icon: RotateCcw },
  { label: 'Mulai layanan', icon: UserRound },
  { label: 'Selesaikan', icon: Check },
  { label: 'Tidak hadir', icon: SkipForward },
  { label: 'Tahan', icon: Pause },
  { label: 'Transfer', icon: ArrowRightLeft },
] as const;

export default async function OperatorPage({ searchParams }: { searchParams: Promise<{ scenario?: string | string[] }> }) {
  const query = await searchParams;
  const scenario = getScenarioData(query.scenario);
  const operatorStats = [
    { label: 'Menunggu', value: String(scenario.totals.waiting), note: `${scenario.queueRows.filter((row) => row.category === 'Reservasi').length} reservasi online`, icon: UsersRound, tone: 'bg-orange-50 text-orange-700' },
    { label: 'Selesai hari ini', value: String(scenario.totals.completed), note: `${scenario.totals.serving} sedang dilayani`, icon: CheckCircle2, tone: 'bg-emerald-50 text-emerald-700' },
    { label: 'Rata-rata layanan', value: String(scenario.totals.averageService), suffix: 'mnt', note: `Waktu tunggu ${scenario.totals.averageWait} menit`, icon: Timer, tone: 'bg-blue-50 text-blue-700' },
    { label: 'SLA layanan', value: String(scenario.totals.sla), suffix: '%', note: 'Target harian 90%', icon: Clock3, tone: 'bg-violet-50 text-violet-700' },
  ];
  const isDisrupted = scenario.id === 'disruption';
  const operatorFocus = isDisrupted
    ? { ...scenario.currentCall, number: 'A-023', service: 'Perekaman KTP-el', checkIn: scenario.ticket.issuedAt, wait: scenario.ticket.estimate, callLabel: 'Antrean dialihkan' }
    : scenario.currentCall;

  return (
    <main id="main-content" className="admin-dashboard min-h-dvh bg-[#f4f4f5] p-2 text-zinc-950 sm:p-4 lg:p-5">
      <div className="mx-auto min-h-[calc(100dvh-1rem)] max-w-385 overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-[0_28px_90px_rgba(24,24,27,0.09)] sm:min-h-[calc(100dvh-2rem)]">
        <header className="flex h-18 items-center justify-between gap-4 border-b border-zinc-200 px-4 sm:px-6 lg:px-8">
          <Link href={scenarioHref('/operator', scenario.id)} className="interactive flex min-w-0 items-center gap-3 rounded-xl focus-visible:ring-2 focus-visible:ring-zinc-400">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-zinc-950 text-white shadow-sm">
              <Landmark className="size-4.75" strokeWidth={1.8} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold tracking-[-0.01em]">MPP Kabupaten Arunika</span>
              <span className="block text-xs text-zinc-500">Ruang operator</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-xl bg-zinc-100 p-1 lg:flex" aria-label="Navigasi operasional">
            <Link href={scenarioHref('/operator', scenario.id)} aria-current="page" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-950 shadow-sm">Operator</Link>
            <Link href={scenarioHref('/supervisor', scenario.id)} className="interactive rounded-lg px-4 py-2 text-sm text-zinc-500 hover:bg-white hover:text-zinc-950">Supervisor</Link>
            <Link href={scenarioHref('/admin', scenario.id)} className="interactive rounded-lg px-4 py-2 text-sm text-zinc-500 hover:bg-white hover:text-zinc-950">Konfigurasi</Link>
            <Link href={scenarioHref('/display', scenario.id)} className="interactive rounded-lg px-4 py-2 text-sm text-zinc-500 hover:bg-white hover:text-zinc-950">Display publik</Link>
          </nav>

          <div className="flex items-center gap-2">
            <button type="button" className="interactive hidden h-10 items-center gap-2 rounded-xl border border-zinc-200 px-3 text-xs font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 sm:flex">
              <span className={`size-2 rounded-full ${isDisrupted ? 'bg-red-500' : 'bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]'}`} /> {isDisrupted ? 'Loket gangguan' : 'Loket aktif'} <ChevronDown className="size-3.5" />
            </button>
            <button type="button" className="interactive grid size-10 place-items-center rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950" aria-label="Cari antrean">
              <Search className="size-4.5" strokeWidth={1.8} />
            </button>
            <button type="button" className="interactive relative grid size-10 place-items-center rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950" aria-label="Notifikasi">
              <Bell className="size-4.5" strokeWidth={1.8} />
              <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-orange-500" />
            </button>
            <span className="grid size-10 place-items-center rounded-xl bg-zinc-950 text-xs font-semibold text-white" aria-label="Operator Maya Putri">MP</span>
          </div>
        </header>

        <div className="p-4 pb-32 sm:p-6 sm:pb-32 lg:p-8 lg:pb-32">
          <div className="mx-auto max-w-350">
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-orange-700">
                  <span className="size-2 rounded-full bg-orange-500" /> Operator / Zona A
                </div>
                <h1 className="mt-3 text-4xl font-semibold leading-none tracking-[-0.05em] sm:text-5xl">Loket 04</h1>
                <p className="mt-3 text-sm text-zinc-500">Perekaman KTP-el dan dokumen kependudukan</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-xs text-zinc-500">Sesi dibuka <strong className="tabular ml-1 font-semibold text-zinc-950">07.56 WIB</strong></span>
                <Link href={scenarioHref('/display', scenario.id)} className="interactive inline-flex min-h-10 items-center gap-2 rounded-xl bg-zinc-950 px-4 text-sm font-medium text-white hover:bg-zinc-800">
                  Lihat display <Megaphone className="size-4" />
                </Link>
              </div>
            </section>

            <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan loket">
              {operatorStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <article key={stat.label} className="rounded-2xl border border-zinc-200 bg-[#fbfbfc] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm font-medium text-zinc-600">{stat.label}</p>
                      <span className={`grid size-9 place-items-center rounded-xl ${stat.tone}`}><Icon className="size-4.5" strokeWidth={1.8} /></span>
                    </div>
                    <p className="tabular mt-5 text-4xl font-semibold tracking-[-0.055em]">
                      {stat.value}{'suffix' in stat ? <span className="ml-1 text-sm font-medium tracking-normal text-zinc-500">{stat.suffix}</span> : null}
                    </p>
                    <p className="mt-2 text-xs text-zinc-500">{stat.note}</p>
                  </article>
                );
              })}
            </section>

            <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
              <section className="min-w-0 overflow-hidden rounded-3xl border border-zinc-200 bg-white">
                <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-5 sm:px-6">
                  <div>
                    <h2 className="text-lg font-semibold tracking-[-0.02em]">Antrean berikutnya</h2>
                    <p className="mt-1 text-sm text-zinc-500">Urutan antrean yang sudah check-in hari ini.</p>
                  </div>
                  <button type="button" className="interactive grid size-10 place-items-center rounded-xl border border-zinc-200 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950" aria-label="Menu antrean">
                    <MoreHorizontal className="size-4.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-170 text-left text-sm">
                    <thead className="bg-zinc-50 text-xs text-zinc-500">
                      <tr><th className="px-5 py-3.5 font-medium sm:pl-6">Nomor</th><th className="px-5 py-3.5 font-medium">Layanan</th><th className="px-5 py-3.5 font-medium">Kategori</th><th className="px-5 py-3.5 font-medium">Check-in</th><th className="px-5 py-3.5 font-medium sm:pr-6">Status</th></tr>
                    </thead>
                    <tbody>
                      {scenario.queueRows.map((row) => (
                        <tr key={row.number} className="border-t border-zinc-100 transition-colors hover:bg-zinc-50/80">
                          <td className="tabular px-5 py-4 font-semibold text-zinc-950 sm:pl-6">{row.number}</td>
                          <td className="px-5 py-4 font-medium text-zinc-800">{row.service}</td>
                          <td className="px-5 py-4 text-zinc-500">{row.category}</td>
                          <td className="tabular px-5 py-4 text-zinc-500">{row.time}</td>
                          <td className="px-5 py-4 sm:pr-6">
                            <span className={row.status === 'Dipanggil' ? 'inline-flex rounded-lg bg-orange-50 px-2.5 py-1.5 text-xs font-medium text-orange-700' : row.status === 'Dialihkan' || row.status === 'Tertunda' ? 'inline-flex rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-700' : row.status === 'Pendampingan' ? 'inline-flex rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs font-medium text-amber-700' : 'inline-flex rounded-lg bg-zinc-100 px-2.5 py-1.5 text-xs font-medium text-zinc-600'}>{row.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-5 py-4 text-xs text-zinc-500 sm:px-6">
                  <span>Menampilkan {scenario.queueRows.length} antrean berikutnya</span>
                  <span className="tabular">Terakhir diperbarui {scenario.updatedAt}</span>
                </div>
              </section>

              <aside className="h-fit overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_22px_48px_rgba(24,24,27,0.10)]">
                <div className="bg-zinc-950 p-6 text-white">
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-orange-300"><span className={`size-2 rounded-full bg-orange-400 ${scenario.id === 'called' ? 'animate-pulse' : ''}`} /> {operatorFocus.callLabel}</span>
                    <Clock3 className="size-4.5 text-zinc-500" strokeWidth={1.7} />
                  </div>
                  <p className="tabular mt-8 text-center text-7xl font-semibold tracking-[-0.08em]">{operatorFocus.number}</p>
                  <p className="mt-3 text-center text-sm text-zinc-400">{operatorFocus.service}</p>
                  <div className="mt-7 grid grid-cols-2 gap-2 border-t border-white/10 pt-5 text-xs">
                    <div><span className="block text-zinc-500">Check-in</span><strong className="tabular mt-1 block font-medium text-zinc-200">{operatorFocus.checkIn} WIB</strong></div>
                    <div className="text-right"><span className="block text-zinc-500">Menunggu</span><strong className="tabular mt-1 block font-medium text-zinc-200">{operatorFocus.wait}</strong></div>
                  </div>
                </div>

                <div className="p-5">
                  <button type="button" disabled className="flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 text-sm font-semibold text-white opacity-90">
                    <Megaphone className="size-4.5" /> {isDisrupted ? 'Panggilan dijeda' : 'Panggil berikutnya'}
                  </button>
                  <p className="mt-2 text-center text-[11px] leading-4 text-zinc-400">Kontrol dinonaktifkan pada snapshot demo.</p>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {actionButtons.map((action) => {
                      const Icon = action.icon;
                      return (
                        <button key={action.label} type="button" disabled className="flex min-h-11 cursor-not-allowed items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-left text-xs font-medium text-zinc-500">
                          <Icon className="size-4" strokeWidth={1.8} /> {action.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-zinc-200 bg-zinc-50 px-5 py-4">
                  <div className="flex items-center justify-between text-sm"><span className="text-zinc-500">Operator aktif</span><strong className="font-medium text-zinc-950">Maya Putri</strong></div>
                  <div className="mt-2 flex items-center justify-between text-sm"><span className="text-zinc-500">Perangkat</span><span className={`inline-flex items-center gap-2 text-xs font-medium ${isDisrupted ? 'text-red-700' : 'text-emerald-700'}`}><span className={`size-2 rounded-full ${isDisrupted ? 'bg-red-500' : 'bg-emerald-500'}`} /> {isDisrupted ? 'Terputus' : 'Terhubung'}</span></div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
