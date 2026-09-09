import Link from 'next/link';
import {
  AlertTriangle,
  ArrowDownRight,
  Bell,
  CalendarDays,
  ChevronDown,
  Clock3,
  Gauge,
  Landmark,
  Search,
  TrendingUp,
  Users,
} from 'lucide-react';
import { getScenarioCounters, getScenarioData, scenarioHref } from '@/lib/mpp-data';

export default async function SupervisorPage({ searchParams }: { searchParams: Promise<{ scenario?: string | string[] }> }) {
  const query = await searchParams;
  const scenario = getScenarioData(query.scenario);
  const counters = getScenarioCounters(scenario.id);
  const metrics = [
    { label: 'Antrean aktif', value: String(scenario.totals.waiting), note: `${scenario.totals.serving} warga sedang dilayani`, tone: scenario.id === 'busy' ? 'text-amber-700' : 'text-emerald-700', dot: scenario.id === 'busy' ? 'bg-amber-500' : 'bg-emerald-500' },
    { label: 'Waktu tunggu', value: String(scenario.totals.averageWait), suffix: 'mnt', note: 'rata-rata seluruh layanan', tone: scenario.totals.averageWait > 20 ? 'text-red-700' : 'text-zinc-500', dot: scenario.totals.averageWait > 20 ? 'bg-red-500' : 'bg-orange-500' },
    { label: 'Loket aktif', value: `${scenario.totals.activeCounters}/${scenario.totals.totalCounters}`, note: `${scenario.totals.totalCounters - scenario.totals.activeCounters} loket tidak melayani`, tone: scenario.totals.activeCounters < 5 ? 'text-red-700' : 'text-amber-700', dot: scenario.totals.activeCounters < 5 ? 'bg-red-500' : 'bg-amber-500' },
    { label: 'SLA terpenuhi', value: String(scenario.totals.sla), suffix: '%', note: 'Target harian 90%', tone: scenario.totals.sla >= 90 ? 'text-emerald-700' : 'text-red-700', dot: scenario.totals.sla >= 90 ? 'bg-emerald-500' : 'bg-red-500' },
  ];
  const statusTone = scenario.system.tone === 'danger' ? 'bg-red-500' : scenario.system.tone === 'warning' ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <main id="main-content" className="admin-dashboard min-h-dvh bg-[#f4f4f5] p-2 text-zinc-950 sm:p-4 lg:p-5">
      <div className="mx-auto min-h-[calc(100dvh-1rem)] max-w-385 overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-[0_28px_90px_rgba(24,24,27,0.09)] sm:min-h-[calc(100dvh-2rem)]">
        <header className="flex h-18 items-center justify-between gap-4 border-b border-zinc-200 px-4 sm:px-6 lg:px-8">
          <Link href={scenarioHref('/supervisor', scenario.id)} className="interactive flex min-w-0 items-center gap-3 rounded-xl focus-visible:ring-2 focus-visible:ring-zinc-400">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-zinc-950 text-white shadow-sm"><Landmark className="size-4.75" strokeWidth={1.8} /></span>
            <span className="min-w-0"><span className="block truncate text-sm font-semibold tracking-[-0.01em]">MPP Kabupaten Wakanda</span><span className="block text-xs text-zinc-500">Ruang supervisor</span></span>
          </Link>

          <nav className="hidden items-center gap-1 rounded-xl bg-zinc-100 p-1 lg:flex" aria-label="Navigasi operasional">
            <Link href={scenarioHref('/operator', scenario.id)} className="interactive rounded-lg px-4 py-2 text-sm text-zinc-500 hover:bg-white hover:text-zinc-950">Operator</Link>
            <Link href={scenarioHref('/supervisor', scenario.id)} aria-current="page" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-950 shadow-sm">Supervisor</Link>
            <Link href={scenarioHref('/admin', scenario.id)} className="interactive rounded-lg px-4 py-2 text-sm text-zinc-500 hover:bg-white hover:text-zinc-950">Konfigurasi</Link>
            <Link href={scenarioHref('/display', scenario.id)} className="interactive rounded-lg px-4 py-2 text-sm text-zinc-500 hover:bg-white hover:text-zinc-950">Display publik</Link>
          </nav>

          <div className="flex items-center gap-2">
            <button type="button" className="interactive hidden h-10 items-center gap-2 rounded-xl border border-zinc-200 px-3 text-xs font-medium text-zinc-600 hover:bg-zinc-100 sm:flex"><span className={`size-2 rounded-full ${statusTone}`} /> {scenario.system.label} <ChevronDown className="size-3.5" /></button>
            <button type="button" className="interactive grid size-10 place-items-center rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-100" aria-label="Cari"><Search className="size-4.5" /></button>
            <button type="button" className="interactive relative grid size-10 place-items-center rounded-xl border border-zinc-200 text-zinc-600 hover:bg-zinc-100" aria-label="Notifikasi"><Bell className="size-4.5" /><span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-orange-500" /></button>
            <span className="grid size-10 place-items-center rounded-xl bg-zinc-950 text-xs font-semibold text-white" aria-label="Supervisor Nadia Puspita">NP</span>
          </div>
        </header>

        <div className="p-4 pb-32 sm:p-6 sm:pb-32 lg:p-8 lg:pb-32">
          <div className="mx-auto max-w-350">
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-orange-700"><span className="size-2 rounded-full bg-orange-500" /> Supervisor / Seluruh zona</div>
                <h1 className="mt-3 max-w-[20ch] text-4xl font-semibold leading-[1.02] tracking-tighter sm:text-5xl">Kondisi layanan hari ini</h1>
                <p className="mt-3 text-sm text-zinc-500">Snapshot antrean dan performa enam loket pelayanan.</p>
              </div>
              <button type="button" className="interactive inline-flex h-10 w-fit items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-600 hover:bg-zinc-100"><CalendarDays className="size-4" /> 8 Sep 2026 <ChevronDown className="size-3.5" /></button>
            </section>

            <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan operasional">
              {metrics.map((metric) => (
                <article key={metric.label} className="rounded-2xl border border-zinc-200 bg-[#fbfbfc] p-5">
                  <div className="flex items-center justify-between gap-4"><p className="text-sm font-medium text-zinc-600">{metric.label}</p><span className={`size-2.5 rounded-full ${metric.dot}`} /></div>
                  <p className="tabular mt-5 text-4xl font-semibold tracking-[-0.055em]">{metric.value}{'suffix' in metric ? <span className="ml-1 text-sm font-medium tracking-normal text-zinc-500">{metric.suffix}</span> : null}</p>
                  <p className={`mt-2 text-xs ${metric.tone}`}>{metric.note}</p>
                </article>
              ))}
            </section>

            <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
              <article className="rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div><h2 className="text-lg font-semibold tracking-[-0.02em]">Arus kedatangan</h2><p className="mt-1 text-sm text-zinc-500">Jumlah check-in per jam</p></div>
                  <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium ${scenario.id === 'busy' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}><ArrowDownRight className="size-3.5" /> {scenario.id === 'busy' ? '41% di atas pola normal' : '8% dari kemarin'}</span>
                </div>

                <div className="mt-8 flex h-52 items-end gap-2 sm:gap-4">
                  {scenario.hourlyLoad.map((value, index) => (
                    <div key={`${value}-${index}`} className="flex h-full flex-1 flex-col justify-end gap-2">
                      <div className="group relative flex-1 overflow-hidden rounded-lg bg-zinc-100">
                        <div className="absolute inset-x-0 bottom-0 rounded-lg bg-zinc-950 transition-colors group-hover:bg-orange-500" style={{ height: `${value}%` }} />
                      </div>
                      <span className="tabular text-center text-[10px] text-zinc-400">{7 + index}.00</span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white">
                <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-5"><div><h2 className="text-lg font-semibold tracking-[-0.02em]">Beban per layanan</h2><p className="mt-1 text-sm text-zinc-500">Waktu tunggu dan antrean</p></div><span className="grid size-10 place-items-center rounded-xl bg-orange-50 text-orange-700"><Gauge className="size-5" /></span></div>
                <div className="space-y-5 p-5">
                  {scenario.serviceLoad.map((service) => (
                    <div key={service.name}>
                      <div className="flex items-center justify-between gap-4 text-sm"><span className="min-w-0 truncate font-medium text-zinc-700">{service.name}</span><span className="tabular shrink-0 text-xs text-zinc-500">{service.wait} mnt · {service.queue} antrean</span></div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100"><div className="h-full rounded-full bg-orange-500" style={{ width: `${service.load}%` }} /></div>
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <section className="mt-5 overflow-hidden rounded-3xl border border-zinc-200 bg-white">
              <div className="flex flex-col justify-between gap-3 border-b border-zinc-200 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
                <div><h2 className="text-lg font-semibold tracking-[-0.02em]">Status loket</h2><p className="mt-1 text-sm text-zinc-500">Enam loket di tiga zona pelayanan</p></div>
                <span className={`inline-flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${scenario.system.tone === 'danger' ? 'bg-red-50 text-red-700' : scenario.system.tone === 'warning' ? 'bg-amber-50 text-amber-700' : 'bg-zinc-100 text-zinc-600'}`}><AlertTriangle className="size-3.5" /> {scenario.system.detail}</span>
              </div>
              <div className="grid gap-px bg-zinc-200 sm:grid-cols-2 xl:grid-cols-3">
                {counters.map((counter) => (
                  <article key={counter.id} className="bg-white p-5 transition-colors hover:bg-zinc-50">
                    <div className="flex items-center justify-between gap-4"><span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600">{counter.zone}</span><span className={`inline-flex items-center gap-1.5 text-xs font-medium ${counter.status === 'Gangguan' ? 'text-red-700' : counter.status === 'Istirahat' || counter.status === 'Pendampingan' ? 'text-amber-700' : 'text-emerald-700'}`}><span className={`size-2 rounded-full ${counter.status === 'Gangguan' ? 'bg-red-500' : counter.status === 'Istirahat' || counter.status === 'Pendampingan' ? 'bg-amber-500' : 'bg-emerald-500'}`} /> {counter.status}</span></div>
                    <div className="mt-5 flex items-end justify-between gap-4"><div className="min-w-0"><h3 className="font-semibold">{counter.label}</h3><p className="mt-1 truncate text-sm text-zinc-500">{counter.service}</p></div><strong className="tabular text-2xl font-semibold tracking-[-0.04em]">{counter.ticket}</strong></div>
                    <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs text-zinc-500"><span className="flex items-center gap-1.5"><Users className="size-3.5" /> {counter.operator}</span><span className="tabular flex items-center gap-1.5"><Clock3 className="size-3.5" /> {counter.wait} mnt</span></div>
                  </article>
                ))}
              </div>
            </section>

            <footer className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-5 text-xs text-zinc-500"><span>Terakhir diperbarui {scenario.updatedAt}</span><span className={`inline-flex items-center gap-1.5 ${scenario.system.tone === 'danger' ? 'text-red-700' : 'text-emerald-700'}`}><TrendingUp className="size-3.5" /> {scenario.system.tone === 'danger' ? 'Sinkronisasi sebagian' : 'Semua data tersinkron'}</span></footer>
          </div>
        </div>
      </div>
    </main>
  );
}
