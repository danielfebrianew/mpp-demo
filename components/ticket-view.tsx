import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Clock3,
  Info,
  Landmark,
  MapPin,
  QrCode,
  Users,
} from 'lucide-react';
import { getScenarioData, scenarioHref } from '@/lib/mpp-data';

export function TicketView({ number, scenarioId }: { number: string; scenarioId?: string | string[] }) {
  const scenario = getScenarioData(scenarioId);
  const status = scenario.ticket;
  const isCalled = status.called;
  const isPriority = scenario.id === 'priority';

  return (
    <main id="main-content" className="admin-dashboard min-h-dvh bg-[#f4f4f5] px-3 py-4 pb-28 text-zinc-950 sm:px-5 sm:py-7 sm:pb-32">
      <div className="mx-auto max-w-130">
        <header className="mb-4 flex items-center justify-between gap-4 px-1">
          <Link href={scenarioHref('/', scenario.id)} className="interactive flex min-w-0 items-center gap-3 rounded-xl text-zinc-700 hover:text-zinc-950 focus-visible:ring-2 focus-visible:ring-zinc-400">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-zinc-950 text-white shadow-sm">
              <Landmark className="size-4.5" strokeWidth={1.8} />
            </span>
            <span className="min-w-0"><span className="block truncate text-sm font-semibold">MPP Kabupaten Arunika</span><span className="block text-xs text-zinc-500">Tiket antrean digital</span></span>
          </Link>
          <Link href={scenarioHref('/kiosk', scenario.id)} className="interactive grid size-10 shrink-0 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950" aria-label="Kembali ke kiosk">
            <ArrowLeft className="size-4.5" />
          </Link>
        </header>

        <article className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-[0_24px_70px_rgba(24,24,27,0.12)]">
          <header className="flex items-start justify-between gap-4 border-b border-zinc-200 px-5 py-4 sm:px-6">
            <div>
              <p className="text-xs font-semibold text-zinc-950">Tiket antrean</p>
              <p className="mt-1 text-xs text-zinc-500">Selasa, 8 September 2026 · {status.issuedAt} WIB</p>
            </div>
            <span className="rounded-lg bg-zinc-100 px-2.5 py-1.5 text-xs font-medium text-zinc-600">Zona A</span>
          </header>

          <section className="relative overflow-hidden bg-zinc-950 px-6 py-8 text-center text-white sm:py-10">
            <div className="pointer-events-none absolute left-1/2 top-0 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.18),transparent_68%)]" />
            <p className="relative text-xs font-medium text-zinc-400">Nomor antrean Anda</p>
            <p className="tabular relative mt-4 text-7xl font-semibold leading-none tracking-[-0.085em] sm:text-8xl">{number}</p>
            <p className="relative mt-4 text-sm text-zinc-400">Perekaman KTP-el</p>
            <div className={`relative mx-auto mt-6 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold ${status.alert ? 'bg-amber-400/15 text-amber-300' : isCalled ? 'bg-orange-500 text-white' : isPriority ? 'bg-orange-400/15 text-orange-300' : 'bg-emerald-400/15 text-emerald-300'}`}>
              <span className={`size-2 rounded-full ${status.alert ? 'bg-amber-400' : isCalled ? 'animate-pulse bg-white' : isPriority ? 'bg-orange-400' : 'bg-emerald-400'}`} /> {status.label}
            </div>
          </section>

          <section className="border-b border-zinc-200 px-5 py-5 sm:px-6">
            <div className={`rounded-2xl p-4 ${status.alert ? 'bg-amber-50 text-amber-950' : isCalled ? 'bg-orange-50 text-orange-950' : 'bg-zinc-50 text-zinc-950'}`}>
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg ${status.alert ? 'bg-amber-100 text-amber-700' : isCalled || isPriority ? 'bg-orange-100 text-orange-700' : 'bg-white text-zinc-500'}`}>
                  <Info className="size-4" strokeWidth={1.9} />
                </span>
                <div><p className="text-sm font-semibold">{status.detail}</p><p className="mt-1 text-xs opacity-65">{status.ahead}</p></div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-[1fr_auto] items-center gap-5 border-b border-zinc-200 px-5 py-5 text-left sm:px-6">
            <div>
              <p className="text-xs text-zinc-500">Kode tiket</p>
              <p className="tabular mt-1.5 text-sm font-semibold text-zinc-950">ARU-A023-080926</p>
              <p className="mt-3 max-w-[26ch] text-xs leading-5 text-zinc-500">Tunjukkan kode ini saat diminta petugas.</p>
            </div>
            <span className="grid size-24 place-items-center rounded-2xl border border-zinc-200 bg-zinc-50">
              <QrCode className="size-16 text-zinc-950" strokeWidth={1.5} />
            </span>
          </section>

          <section className="grid grid-cols-3 divide-x divide-zinc-200 bg-zinc-50">
            <div className="p-4 sm:p-5"><Users className="size-4.5 text-zinc-400" strokeWidth={1.8} /><p className="mt-4 text-[11px] text-zinc-500">Di depan</p><p className="tabular mt-1 text-sm font-semibold">{status.aheadCount}</p></div>
            <div className="p-4 sm:p-5"><Clock3 className="size-4.5 text-zinc-400" strokeWidth={1.8} /><p className="mt-4 text-[11px] text-zinc-500">Estimasi</p><p className="tabular mt-1 text-sm font-semibold">{status.estimate}</p></div>
            <div className="p-4 sm:p-5"><MapPin className="size-4.5 text-zinc-400" strokeWidth={1.8} /><p className="mt-4 text-[11px] text-zinc-500">Tujuan</p><p className="mt-1 text-sm font-semibold">{status.destination}</p></div>
          </section>
        </article>

        <section className="mt-4 rounded-2xl border border-zinc-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700"><Check className="size-4.5" strokeWidth={2} /></span>
            <div><h2 className="text-sm font-semibold">Dokumen siap diperiksa</h2><p className="mt-1 text-xs leading-5 text-zinc-500">Siapkan Kartu Keluarga asli dan perhatikan display antrean.</p></div>
          </div>
        </section>

        <Link href={scenarioHref('/operator', scenario.id)} className="interactive mt-4 flex min-h-13 items-center justify-between rounded-2xl bg-zinc-950 px-5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(24,24,27,0.16)] hover:bg-zinc-800">
          Lihat sisi operator <ArrowUpRight className="size-4.5" />
        </Link>

        <p className="mt-5 text-center text-[11px] leading-5 text-zinc-400">Tiket demo · Data tidak disimpan atau dikirim.</p>
      </div>
    </main>
  );
}
