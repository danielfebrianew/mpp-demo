import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  Info,
  MapPin,
  ReceiptText,
  Users,
} from 'lucide-react';
import { PublicHeader } from '@/components/public-header';
import { getScenarioData, getScenarioServices, scenarioHref, services } from '@/lib/mpp-data';

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ scenario?: string | string[] }> }) {
  const { slug } = await params;
  const query = await searchParams;
  const scenario = getScenarioData(query.scenario);
  const scenarioServices = getScenarioServices(scenario.id);
  const service = scenarioServices.find((item) => item.slug === slug) ?? scenarioServices[0];
  const statusClass = scenario.system.tone === 'danger'
    ? 'text-red-300'
    : scenario.system.tone === 'warning'
      ? 'text-amber-300'
      : 'text-emerald-300';
  const statusDot = scenario.system.tone === 'danger' ? 'bg-red-400' : scenario.system.tone === 'warning' ? 'bg-amber-400' : 'bg-emerald-400';

  return (
    <main id="main-content" className="admin-dashboard min-h-dvh bg-[#f4f4f5] p-2 text-zinc-950 sm:p-4 lg:p-5">
      <div className="mx-auto max-w-385 overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-[0_28px_90px_rgba(24,24,27,0.09)]">
        <PublicHeader />

        <section className="border-b border-zinc-200 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-310">
            <Link href={scenarioHref('/layanan', scenario.id)} className="interactive inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-950"><ArrowLeft className="size-4" /> Kembali ke direktori</Link>

            <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-2 text-xs font-medium text-orange-700"><Building2 className="size-3.5" /> {service.agency}</span>
                <h1 className="mt-5 max-w-[17ch] text-5xl font-semibold leading-[0.96] tracking-tighter text-balance sm:text-6xl">{service.name}</h1>
                <p className="mt-5 max-w-[56ch] text-base leading-7 text-zinc-500">Periksa persyaratan berikut dan pastikan seluruh dokumen sudah dibawa sebelum mengambil nomor antrean.</p>
              </div>

              <div className="grid grid-cols-3 divide-x divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
                <div className="min-w-0 p-4"><MapPin className="size-4 text-zinc-400" /><p className="mt-3 text-[11px] text-zinc-500">Zona</p><p className="mt-1 truncate text-sm font-semibold">{service.zone}</p></div>
                <div className="min-w-0 p-4"><Building2 className="size-4 text-zinc-400" /><p className="mt-3 text-[11px] text-zinc-500">Lokasi</p><p className="mt-1 truncate text-sm font-semibold">{service.floor}</p></div>
                <div className="min-w-0 p-4"><Users className="size-4 text-zinc-400" /><p className="mt-3 text-[11px] text-zinc-500">Menunggu</p><p className="tabular mt-1 truncate text-sm font-semibold">{service.queue} orang</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 pb-32 sm:px-6 lg:px-8 lg:py-14 lg:pb-32">
          <div className="mx-auto grid max-w-310 gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div className="space-y-6">
              <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white">
                <header className="border-b border-zinc-200 px-5 py-5 sm:px-6"><span className="text-xs font-medium text-orange-700">Sebelum berangkat</span><h2 className="mt-2 text-2xl font-semibold tracking-tight">Dokumen yang perlu dibawa</h2><p className="mt-1 text-sm text-zinc-500">Siapkan dokumen asli kecuali disebutkan lain.</p></header>
                <div className="grid gap-px bg-zinc-200 sm:grid-cols-2">
                  {service.requirement.map((item, index) => (
                    <div key={item} className="flex min-h-32 items-start gap-4 bg-[#fbfbfc] p-5 sm:p-6">
                      <span className="tabular grid size-9 shrink-0 place-items-center rounded-xl bg-white text-xs font-semibold text-zinc-600 shadow-sm">0{index + 1}</span>
                      <div><CheckCircle2 className="size-4 text-emerald-600" /><p className="mt-3 text-sm font-medium leading-6 text-zinc-700">{item}</p></div>
                    </div>
                  ))}
                  {service.requirement.length % 2 !== 0 ? (
                    <div className="hidden min-h-32 items-center justify-center bg-zinc-50 p-6 text-xs text-zinc-400 sm:flex">Semua dokumen wajib dibawa</div>
                  ) : null}
                </div>
              </article>

              <article className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6">
                <header className="flex items-start justify-between gap-4"><div><span className="text-xs font-medium text-orange-700">Saat tiba di MPP</span><h2 className="mt-2 text-2xl font-semibold tracking-tight">Alur pelayanan</h2></div><span className="grid size-10 place-items-center rounded-xl bg-white text-zinc-500"><Info className="size-4.5" /></span></header>
                <ol className="mt-7 grid gap-3 sm:grid-cols-2">
                  {['Pilih layanan di kiosk', 'Konfirmasi dan check-in', 'Tunggu nomor dipanggil', 'Datang ke loket tujuan'].map((item, index) => (
                    <li key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm font-medium text-zinc-700"><span className="tabular grid size-8 shrink-0 place-items-center rounded-lg bg-zinc-100 text-xs text-zinc-500">0{index + 1}</span><span className="flex-1">{item}</span></li>
                  ))}
                </ol>
              </article>
            </div>

            <aside className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_22px_48px_rgba(24,24,27,0.10)] lg:sticky lg:top-6">
              <div className="relative overflow-hidden bg-zinc-950 p-6 text-white">
                <div className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.18),transparent_68%)]" />
                <div className="relative flex items-center justify-between gap-4"><span className="text-sm text-zinc-400">Antrean sekarang</span><span className={`inline-flex items-center gap-1.5 text-xs font-medium ${statusClass}`}><span className={`size-2 rounded-full ${statusDot}`} /> {scenario.system.label}</span></div>
                <p className="tabular relative mt-5 text-6xl font-semibold tracking-[-0.065em]">{service.queue}</p>
                <p className="relative mt-2 text-sm text-zinc-400">orang sedang menunggu</p>
              </div>

              <div className="p-5 sm:p-6">
                <div className="space-y-4 text-sm">
                  <p className="flex items-center justify-between gap-4"><span className="flex items-center gap-2 text-zinc-500"><Clock3 className="size-4" /> Durasi</span><strong className="font-semibold">{service.duration}</strong></p>
                  <p className="flex items-center justify-between gap-4"><span className="flex items-center gap-2 text-zinc-500"><ReceiptText className="size-4" /> Biaya</span><strong className="font-semibold">{service.fee}</strong></p>
                  <p className="flex items-center justify-between gap-4"><span className="flex items-center gap-2 text-zinc-500"><MapPin className="size-4" /> Lokasi</span><strong className="font-semibold">{service.floor}</strong></p>
                </div>

                <Link href={scenarioHref('/#kunjungan', scenario.id)} className="interactive mt-6 flex min-h-12 items-center justify-between rounded-xl bg-zinc-950 px-4 text-sm font-semibold text-white hover:bg-zinc-800">Panduan kunjungan <ArrowRight className="size-4" /></Link>
                <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-zinc-500"><Check className="mt-0.5 size-3.5 shrink-0 text-emerald-600" /> Mode demo tidak menyimpan atau mengirim data.</p>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
