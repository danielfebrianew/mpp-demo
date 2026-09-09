import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  MapPin,
  Search,
  SlidersHorizontal,
  Users,
} from 'lucide-react';
import { PublicHeader } from '@/components/public-header';
import { agencies, getScenarioData, getScenarioServices, scenarioHref } from '@/lib/mpp-data';

export default async function ServicesPage({ searchParams }: { searchParams: Promise<{ agency?: string | string[]; scenario?: string | string[] }> }) {
  const query = await searchParams;
  const scenario = getScenarioData(query.scenario);
  const selectedAgency = Array.isArray(query.agency) ? query.agency[0] : query.agency;
  const services = getScenarioServices(scenario.id);
  const filteredServices = selectedAgency ? services.filter((service) => service.agencyId === selectedAgency) : services;

  return (
    <main id="main-content" className="admin-dashboard min-h-dvh bg-[#f4f4f5] p-2 text-zinc-950 sm:p-4 lg:p-5">
      <div className="mx-auto max-w-385 overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-[0_28px_90px_rgba(24,24,27,0.09)]">
        <PublicHeader />

        <section className="border-b border-zinc-200 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-350">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
              <div>
                <span className="text-xs font-medium text-orange-700">Direktori pelayanan</span>
                <h1 className="mt-4 max-w-[16ch] text-5xl font-semibold leading-[0.96] tracking-tighter text-balance sm:text-6xl">Cari urusan, bukan nama dinas.</h1>
                <p className="mt-5 max-w-[52ch] text-base leading-7 text-zinc-500">Temukan persyaratan, lokasi, durasi, dan kondisi antrean sebelum datang.</p>
              </div>

              <div>
                <label htmlFor="service-search" className="mb-2 block text-xs font-medium text-zinc-500">Cari layanan atau instansi</label>
                <div className="flex h-14 items-center rounded-2xl border border-zinc-200 bg-zinc-50 px-4 transition-colors focus-within:border-zinc-400 focus-within:bg-white">
                  <Search className="size-4.5 shrink-0 text-zinc-400" />
                  <input id="service-search" type="search" placeholder="Contoh: KTP, izin usaha, atau pajak" className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-400" />
                  <SlidersHorizontal className="size-4 shrink-0 text-zinc-400" />
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-2" aria-label="Filter instansi">
              <Link href={scenarioHref('/layanan', scenario.id)} aria-current={!selectedAgency ? 'page' : undefined} className={selectedAgency ? 'interactive rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950' : 'rounded-xl bg-zinc-950 px-3.5 py-2 text-xs font-semibold text-white'}>Semua layanan</Link>
              {agencies.map((agency) => (
                <Link key={agency.id} href={scenarioHref(`/layanan?agency=${agency.id}`, scenario.id)} aria-current={selectedAgency === agency.id ? 'page' : undefined} className={selectedAgency === agency.id ? 'rounded-xl bg-zinc-950 px-3.5 py-2 text-xs font-semibold text-white' : 'interactive rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950'}>{agency.name}</Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 pb-32 sm:px-6 lg:px-8 lg:py-14 lg:pb-32">
          <div className="mx-auto max-w-350">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div><h2 className="text-2xl font-semibold tracking-tight">Layanan tersedia</h2><p className="mt-1 text-sm text-zinc-500">{scenario.system.detail}.</p></div>
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700"><CheckCircle2 className="size-3.5" /> {filteredServices.length} layanan tampil</div>
            </div>

            <div className="mt-7 grid gap-3 lg:grid-cols-2">
              {filteredServices.map((service, index) => (
                <Link key={service.slug} href={scenarioHref(`/layanan/${service.slug}`, scenario.id)} className="interactive group flex min-h-56 flex-col rounded-3xl border border-zinc-200 bg-[#fbfbfc] p-5 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_40px_rgba(24,24,27,0.08)] sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3"><span className="tabular grid size-10 place-items-center rounded-xl bg-zinc-100 text-xs font-semibold text-zinc-600">{service.code}{index + 1}</span><span><span className="block text-xs font-medium text-orange-700">{service.agency}</span><span className="mt-1 block text-xs text-zinc-400">{service.zone} · {service.floor}</span></span></div>
                    <ArrowUpRight className="size-4.5 text-zinc-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-950" />
                  </div>

                  <h3 className="mt-7 max-w-[24ch] text-xl font-semibold leading-tight tracking-tight">{service.name}</h3>

                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-zinc-200 pt-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1.5"><Clock3 className="size-3.5" /> {service.duration}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="size-3.5" /> {service.zone}</span>
                    <span className="tabular ml-auto flex items-center gap-1.5 font-medium text-zinc-700"><Users className="size-3.5" /> {service.queue} menunggu</span>
                  </div>
                </Link>
              ))}
            </div>

            <section className="mt-10 flex flex-col justify-between gap-5 rounded-3xl bg-zinc-950 px-6 py-7 text-white sm:flex-row sm:items-center sm:px-8">
              <div><h2 className="text-xl font-semibold tracking-tight">Sudah siap mengambil antrean?</h2><p className="mt-1 text-sm text-zinc-400">Gunakan kiosk saat Anda tiba di gedung MPP.</p></div>
              <Link href={scenarioHref('/kiosk', scenario.id)} className="interactive inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-zinc-950 hover:bg-orange-50">Lihat alur antrean <ArrowRight className="size-4" /></Link>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
