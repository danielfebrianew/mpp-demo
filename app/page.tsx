import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MapPin,
  Search,
  Sparkles,
} from 'lucide-react';
import { PublicHeader } from '@/components/public-header';
import { agencies, getScenarioData, popularServices, scenarioHref } from '@/lib/mpp-data';

export default async function Home({ searchParams }: { searchParams: Promise<{ scenario?: string | string[] }> }) {
  const query = await searchParams;
  const scenario = getScenarioData(query.scenario);
  const portalStats = [
    { value: String(scenario.totals.waiting), label: 'sedang menunggu' },
    { value: String(scenario.totals.serving), label: 'sedang dilayani' },
    { value: String(scenario.totals.completed), label: 'selesai hari ini' },
  ];
  const statusClass = scenario.system.tone === 'danger'
    ? 'bg-red-50 text-red-700'
    : scenario.system.tone === 'warning'
      ? 'bg-amber-50 text-amber-700'
      : 'bg-white/90 text-zinc-800';

  return (
    <main id="main-content" className="admin-dashboard min-h-dvh bg-[#f4f4f5] p-2 text-zinc-950 sm:p-4 lg:p-5">
      <div className="mx-auto max-w-385 overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-[0_28px_90px_rgba(24,24,27,0.09)]">
        <PublicHeader />

        <section className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto grid max-w-350 gap-5 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="flex flex-col justify-between rounded-3xl bg-zinc-50 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <div>
                <span className="inline-flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-2 text-xs font-medium text-orange-700"><Sparkles className="size-3.5" /> Pelayanan publik terpadu</span>
                <h1 className="mt-7 max-w-[13ch] text-5xl font-semibold leading-[0.94] tracking-[-0.055em] text-balance sm:text-6xl xl:text-[4.75rem]">Satu gedung. Urusan lebih singkat.</h1>
                <p className="mt-6 max-w-[42ch] text-base leading-7 text-zinc-500 sm:text-lg">Periksa syarat, lokasi loket, dan kondisi antrean sebelum berangkat ke MPP Kabupaten Arunika.</p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href={scenarioHref('/layanan', scenario.id)} className="interactive inline-flex min-h-12 items-center gap-3 rounded-xl bg-zinc-950 px-5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(24,24,27,0.16)] hover:bg-zinc-800">Cari layanan <Search className="size-4" strokeWidth={1.9} /></Link>
                  <Link href={scenarioHref('/kiosk', scenario.id)} className="interactive inline-flex items-center gap-2 px-1 text-sm font-medium text-zinc-600 hover:text-zinc-950">Lihat alur antrean <ArrowRight className="size-4" /></Link>
                </div>
              </div>

              <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-zinc-200 pt-5 text-xs text-zinc-500">
                <span className="flex items-center gap-2"><Clock3 className="size-4 text-zinc-400" /> Senin–Kamis, 08.00–15.30</span>
                <span className="flex items-center gap-2"><MapPin className="size-4 text-zinc-400" /> Gedung MPP, Lantai 1–2</span>
              </div>
            </div>

            <div className="relative min-h-120 overflow-hidden rounded-3xl bg-zinc-950">
              <Image src="/images/mpp-service-hall.webp" alt="Warga menerima pelayanan di ruang Mal Pelayanan Publik" fill priority sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-zinc-950/5 to-transparent" />
              <div className={`absolute left-5 top-5 inline-flex items-center gap-2 rounded-xl border border-white/20 px-3 py-2 text-xs font-medium shadow-sm backdrop-blur-md ${statusClass}`}><span className={`size-2 rounded-full ${scenario.system.tone === 'danger' ? 'bg-red-500' : scenario.system.tone === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}`} /> {scenario.system.label}</div>

              <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 divide-x divide-white/15 overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/75 text-white shadow-[0_20px_50px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:inset-x-5 sm:bottom-5">
                {portalStats.map((stat) => (
                  <div key={stat.label} className="min-w-0 px-3 py-4 sm:px-5">
                    <p className="tabular text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">{stat.value}</p>
                    <p className="mt-1 truncate text-[11px] text-zinc-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-350 gap-10 lg:grid-cols-[330px_minmax(0,1fr)] lg:gap-16">
            <div>
              <span className="text-xs font-medium text-orange-700">Sering dicari warga</span>
              <h2 className="mt-4 max-w-[12ch] text-4xl font-semibold leading-[0.98] tracking-[-0.045em]">Siapkan dokumen sebelum datang.</h2>
              <p className="mt-5 max-w-[34ch] text-sm leading-6 text-zinc-500">Baca persyaratan lebih dulu supaya kunjungan tidak perlu diulang.</p>
              <Link href={scenarioHref('/layanan', scenario.id)} className="interactive mt-7 inline-flex items-center gap-2 text-sm font-semibold text-zinc-950 hover:text-orange-700">Buka direktori lengkap <ArrowUpRight className="size-4" /></Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {popularServices.map((service, index) => (
                <Link key={service.slug} href={scenarioHref(`/layanan/${service.slug}`, scenario.id)} className="interactive group flex min-h-36 flex-col rounded-2xl border border-zinc-200 bg-[#fbfbfc] p-5 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_36px_rgba(24,24,27,0.08)]">
                  <div className="flex items-start justify-between gap-4"><span className="tabular grid size-8 place-items-center rounded-lg bg-zinc-100 text-xs font-semibold text-zinc-500">0{index + 1}</span><ArrowUpRight className="size-4 text-zinc-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-950" /></div>
                  <div className="mt-auto pt-5"><h3 className="font-semibold tracking-[-0.02em]">{service.name}</h3><p className="mt-1 text-xs text-zinc-500">{service.agency}</p></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-zinc-200 bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-350">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div><span className="text-xs font-medium text-orange-700">Direktori instansi</span><h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Mulai dari instansi tujuan.</h2></div>
              <p className="max-w-[48ch] text-sm leading-6 text-zinc-500">Enam instansi pelayanan terhubung dalam satu gedung dan satu sistem antrean.</p>
            </div>

            <div className="mt-9 grid overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-200 gap-px sm:grid-cols-2">
              {agencies.map((agency) => (
                <Link key={agency.id} href={scenarioHref(`/layanan?agency=${agency.id}`, scenario.id)} className="interactive group flex min-h-32 items-start gap-4 bg-white p-5 hover:bg-zinc-50 sm:p-6">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-zinc-100 text-zinc-500"><Building2 className="size-4.5" strokeWidth={1.7} /></span>
                  <span className="min-w-0 flex-1"><strong className="block font-semibold">{agency.name}</strong><span className="mt-1.5 block text-sm leading-5 text-zinc-500">{agency.description}</span><span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700"><CheckCircle2 className="size-3.5 text-emerald-600" /> {agency.serviceCount} layanan</span></span>
                  <ChevronRight className="mt-1 size-4 shrink-0 text-zinc-300 transition-transform group-hover:translate-x-1 group-hover:text-zinc-950" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-350 flex-col justify-between gap-5 overflow-hidden rounded-3xl bg-zinc-950 px-6 py-7 text-white sm:flex-row sm:items-center sm:px-8">
            <div><h2 className="text-xl font-semibold tracking-tight">Sudah berada di gedung MPP?</h2><p className="mt-1 text-sm text-zinc-400">Ambil nomor melalui kiosk layanan mandiri.</p></div>
            <Link href={scenarioHref('/kiosk', scenario.id)} className="interactive inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-zinc-950 hover:bg-orange-50">Buka kiosk <ArrowRight className="size-4" /></Link>
          </div>
        </section>

        <footer className="px-4 pb-8 pt-2 text-xs text-zinc-500 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-350 flex-col justify-between gap-3 border-t border-zinc-200 pt-6 sm:flex-row"><span>MPP Kabupaten Arunika · Snapshot “{scenario.label}”</span><span>Bukan layanan pemerintah sebenarnya.</span></div>
        </footer>
      </div>
    </main>
  );
}
