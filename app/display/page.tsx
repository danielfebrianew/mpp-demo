import Link from 'next/link';
import {
  ArrowUpRight,
  BellRing,
  Clock3,
  Landmark,
  MapPin,
  MonitorCheck,
  Volume2,
} from 'lucide-react';
import { getScenarioData, scenarioHref } from '@/lib/mpp-data';

const recentCalls = [
  { number: 'A-022', counter: 'Loket 02', service: 'Dokumen kependudukan' },
  { number: 'B-014', counter: 'Loket 03', service: 'Konsultasi perizinan' },
  { number: 'D-008', counter: 'Loket 06', service: 'BPJS Kesehatan' },
  { number: 'A-021', counter: 'Loket 01', service: 'Perekaman KTP-el' },
] as const;

export default async function DisplayPage({ searchParams }: { searchParams: Promise<{ scenario?: string | string[] }> }) {
  const query = await searchParams;
  const scenario = getScenarioData(query.scenario);
  const isDisrupted = scenario.id === 'disruption';
  const recentScenarioCalls = scenario.id === 'called'
    ? recentCalls
    : [
        { number: scenario.currentCall.number, counter: scenario.currentCall.counter, service: scenario.currentCall.service },
        ...recentCalls.filter((call) => call.number !== scenario.currentCall.number).slice(0, 3),
      ];

  return (
    <main id="main-content" className="admin-dashboard min-h-dvh bg-[#f4f4f5] p-2 text-zinc-950 sm:p-4 lg:p-5">
      <div className="mx-auto flex min-h-[calc(100dvh-1rem)] max-w-385 flex-col overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-[0_28px_90px_rgba(24,24,27,0.09)] sm:min-h-[calc(100dvh-2rem)]">
        <header className="flex h-18 shrink-0 items-center justify-between gap-4 border-b border-zinc-200 px-4 sm:px-6 lg:px-8">
          <Link href={scenarioHref('/display', scenario.id)} className="interactive flex min-w-0 items-center gap-3 rounded-xl focus-visible:ring-2 focus-visible:ring-zinc-400">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-zinc-950 text-white shadow-sm">
              <Landmark className="size-4.75" strokeWidth={1.8} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold tracking-[-0.01em]">MPP Kabupaten Wakanda</span>
              <span className="block text-xs text-zinc-500">Display antrean / Zona A</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden items-center gap-2 rounded-xl bg-zinc-100 px-3 py-2 text-xs font-medium text-zinc-600 sm:flex">
              <MapPin className="size-3.5 text-zinc-400" /> Lantai 1
            </span>
            <span className="tabular inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-3 py-2 text-xs font-medium text-white sm:px-4">
              <Clock3 className="size-3.5 text-orange-300" /> {scenario.updatedAt}
            </span>
          </div>
        </header>

        <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
          <section className="grid flex-1 gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
            <article className="relative flex min-h-130 flex-col overflow-hidden rounded-3xl bg-zinc-950 p-6 text-white shadow-[0_24px_60px_rgba(24,24,27,0.20)] sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute -right-24 -top-24 size-128 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.16),transparent_67%)]" />
              <div className="relative flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-orange-500 text-white shadow-[0_12px_30px_rgba(249,115,22,0.24)]">
                    <BellRing className="size-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-orange-300">{scenario.currentCall.callLabel}</p>
                    <p className="mt-1 text-sm text-zinc-400">{scenario.currentCall.service}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-300">
                  <Volume2 className="size-4 text-orange-300" /> {scenario.currentCall.callDetail}
                </span>
              </div>

              <div className="relative my-auto py-10">
                <p className="tabular text-[clamp(6.5rem,17vw,14rem)] font-semibold leading-[0.75] -tracking-widest">{scenario.currentCall.number}</p>
              </div>

              <div className="relative grid gap-5 border-t border-white/10 pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <p className="text-sm text-zinc-500">Silakan menuju</p>
                  <p className="mt-2 text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">{scenario.currentCall.counter}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-right text-xs">
                  <div className="rounded-xl bg-white/5 px-4 py-3"><span className="block text-zinc-500">Zona</span><strong className="mt-1 block font-medium text-zinc-200">{scenario.currentCall.zone}</strong></div>
                  <div className="rounded-xl bg-white/5 px-4 py-3"><span className="block text-zinc-500">Lantai</span><strong className="mt-1 block font-medium text-zinc-200">{scenario.currentCall.floor}</strong></div>
                </div>
              </div>
            </article>

            <aside className="flex min-h-0 flex-col gap-5">
              <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white">
                <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
                  <div>
                    <h2 className="text-base font-semibold tracking-[-0.02em]">Panggilan sebelumnya</h2>
                    <p className="mt-1 text-xs text-zinc-500">Empat panggilan terakhir</p>
                  </div>
                  <span className="grid size-9 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><MonitorCheck className="size-4.5" strokeWidth={1.7} /></span>
                </div>

                <div className="divide-y divide-zinc-100 px-2">
                  {recentScenarioCalls.map((call) => (
                    <div key={call.number} className="flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-zinc-50">
                      <strong className="tabular w-19.2 shrink-0 text-xl font-semibold tracking-[-0.04em]">{call.number}</strong>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-zinc-700">{call.counter}</p>
                        <p className="mt-1 truncate text-xs text-zinc-400">{call.service}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className={`rounded-3xl p-4 ${isDisrupted ? 'bg-red-50 text-red-950' : 'bg-orange-50 text-orange-950'}`}>
                <div className="flex items-start gap-3">
                  <span className={`mt-1 size-2.5 shrink-0 rounded-full ${isDisrupted ? 'bg-red-500' : 'bg-orange-500'}`} />
                  <div><h2 className="text-sm font-semibold">{scenario.system.label}</h2><p className={`mt-2 text-sm leading-6 ${isDisrupted ? 'text-red-800/75' : 'text-orange-800/75'}`}>{scenario.system.detail}</p></div>
                </div>
              </section>

              <Link href={scenarioHref('/supervisor', scenario.id)} className="interactive mt-auto flex min-h-14 items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950">
                Dashboard supervisor <ArrowUpRight className="size-4.5" />
              </Link>
            </aside>
          </section>
        </div>

        <div className="flex min-h-12 shrink-0 items-center overflow-hidden border-t border-zinc-200 bg-zinc-50 text-sm text-zinc-600">
          <span className="flex h-12 shrink-0 items-center bg-orange-500 px-5 font-semibold text-white sm:px-7">Informasi</span>
          <p className="truncate px-5">{scenario.system.detail}. Ikuti arahan petugas pelayanan.</p>
        </div>
      </div>
    </main>
  );
}
