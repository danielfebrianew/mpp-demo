import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Clock3,
  MapPin,
  Search,
  SlidersHorizontal,
  Users,
} from 'lucide-react';
import { HomeHeader, PublicFooter } from '@/components/home-experience';
import { agencies, getScenarioData, getScenarioServices, scenarioHref } from '@/lib/mpp-data';

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ agency?: string | string[]; scenario?: string | string[] }>;
}) {
  const query = await searchParams;
  const scenario = getScenarioData(query.scenario);
  const selectedAgency = Array.isArray(query.agency) ? query.agency[0] : query.agency;
  const services = getScenarioServices(scenario.id);
  const filteredServices = selectedAgency
    ? services.filter((service) => service.agencyId === selectedAgency)
    : services;

  return (
    <div className="mpp-page">
      <HomeHeader scenario={scenario.id} />
      <main id="main-content">
        <section className="mpp-services-intro" aria-labelledby="services-heading">
          <div className="mpp-container">
            <span className="mpp-eyebrow">DIREKTORI PELAYANAN</span>
            <h1 id="services-heading">Cari urusan, bukan nama dinas.</h1>
            <p>Temukan persyaratan, lokasi, durasi, dan kondisi antrean sebelum datang.</p>
            <label className="mpp-search" htmlFor="service-search">
              <span className="mpp-sr-only">Cari layanan atau instansi</span>
              <Search aria-hidden="true" />
              <input id="service-search" type="search" placeholder="Contoh: KTP, izin usaha, atau pajak" />
              <SlidersHorizontal aria-hidden="true" />
            </label>
          </div>
        </section>

        <section className="mpp-section mpp-directory" aria-labelledby="available-heading">
          <div className="mpp-container">
            <div className="mpp-directory-heading">
              <div>
                <h2 id="available-heading">Layanan tersedia.</h2>
                <p>{scenario.system.detail}.</p>
              </div>
              <span className="mpp-service-count"><Check aria-hidden="true" /> {filteredServices.length} layanan tampil</span>
            </div>

            <nav className="mpp-filters" aria-label="Filter instansi">
              <Link href={scenarioHref('/layanan', scenario.id)} aria-current={!selectedAgency ? 'page' : undefined}>Semua layanan</Link>
              {agencies.map((agency) => (
                <Link key={agency.id} href={scenarioHref(`/layanan?agency=${agency.id}`, scenario.id)} aria-current={selectedAgency === agency.id ? 'page' : undefined}>{agency.name}</Link>
              ))}
            </nav>

            <div className="mpp-service-grid">
              {filteredServices.map((service) => (
                <Link key={service.slug} href={scenarioHref(`/layanan/${service.slug}`, scenario.id)} className="mpp-service-card">
                  <div className="mpp-card-top">
                    <span className="mpp-service-icon"><Building2 aria-hidden="true" /></span>
                    <ArrowUpRight aria-hidden="true" />
                  </div>
                  <span className="mpp-card-agency">{service.agency}</span>
                  <h3>{service.name}</h3>
                  <p>{service.requirement.length} persyaratan <span>·</span> {service.fee}</p>
                  <div className="mpp-card-meta">
                    <span><Clock3 aria-hidden="true" /> {service.duration}</span>
                    <span><MapPin aria-hidden="true" /> {service.zone}</span>
                    <span><Users aria-hidden="true" /> {service.queue} menunggu</span>
                  </div>
                  <span className="mpp-card-action">Lihat persyaratan <ArrowRight aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mpp-queue-cta mpp-container" aria-labelledby="queue-heading">
          <div>
            <span className="mpp-eyebrow">SUDAH DI GEDUNG MPP?</span>
            <h2 id="queue-heading">Siap mengambil antrean?</h2>
            <p>Gunakan kiosk saat Anda tiba di gedung MPP.</p>
          </div>
          <span className="mpp-primary-button" aria-label="Ambil antrean melalui kiosk di gedung MPP">Ambil di kiosk saat tiba</span>
        </section>
      </main>
      <PublicFooter scenario={scenario.id} label={scenario.label} />
    </div>
  );
}
