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
import {
  agencies,
  getScenarioData,
  getScenarioServices,
  scenarioHref,
} from '@/lib/mpp-data';
import { matchesServiceQuery } from '@/lib/service-search';

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{
    agency?: string | string[];
    query?: string | string[];
    scenario?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const scenario = getScenarioData(params.scenario);
  const selectedAgency = Array.isArray(params.agency)
    ? params.agency[0]
    : params.agency;
  const searchQuery =
    (Array.isArray(params.query) ? params.query[0] : params.query)?.trim() ??
    '';
  const services = getScenarioServices(scenario.id);
  const filteredServices = services.filter(
    (service) =>
      (!selectedAgency || service.agencyId === selectedAgency) &&
      matchesServiceQuery(service, searchQuery),
  );
  const directoryHref = (agency?: string, includeQuery = true) => {
    const nextParams = new URLSearchParams();
    if (agency) nextParams.set('agency', agency);
    if (includeQuery && searchQuery) nextParams.set('query', searchQuery);
    return scenarioHref(
      `/layanan${nextParams.size ? `?${nextParams.toString()}` : ''}`,
      scenario.id,
    );
  };
  const detailHref = (slug: string) => {
    const contextParams = new URLSearchParams();
    if (selectedAgency) contextParams.set('agency', selectedAgency);
    if (searchQuery) contextParams.set('query', searchQuery);
    return scenarioHref(
      `/layanan/${slug}${contextParams.size ? `?${contextParams.toString()}` : ''}`,
      scenario.id,
    );
  };

  return (
    <div className="mpp-page">
      <HomeHeader scenario={scenario.id} />
      <main id="main-content">
        <section
          className="mpp-services-intro"
          aria-labelledby="services-heading"
        >
          <div className="mpp-container">
            <span className="mpp-eyebrow">DIREKTORI PELAYANAN</span>
            <h1 id="services-heading">Cari urusan, bukan nama dinas.</h1>
            <p>
              Temukan persyaratan, lokasi, durasi, dan kondisi antrean sebelum
              datang.
            </p>
            <form
              className="mpp-search"
              action="/layanan"
              method="get"
              aria-label="Cari layanan"
            >
              <Search aria-hidden="true" />
              <label className="mpp-sr-only" htmlFor="service-search">
                Cari layanan atau instansi
              </label>
              <input
                id="service-search"
                name="query"
                type="search"
                defaultValue={searchQuery}
                placeholder="Contoh: KTP, izin usaha, atau pajak"
              />
              <input type="hidden" name="scenario" value={scenario.id} />
              {selectedAgency ? (
                <input type="hidden" name="agency" value={selectedAgency} />
              ) : null}
              <button type="submit" aria-label="Cari layanan">
                <SlidersHorizontal aria-hidden="true" />
              </button>
            </form>
          </div>
        </section>

        <section
          className="mpp-section mpp-directory"
          aria-labelledby="available-heading"
        >
          <div className="mpp-container">
            <div className="mpp-directory-heading">
              <div>
                <h2 id="available-heading">Layanan tersedia.</h2>
                <p>
                  {searchQuery
                    ? `Hasil pencarian untuk “${searchQuery}”.`
                    : `${scenario.system.detail}.`}
                </p>
              </div>
              <span className="mpp-service-count">
                <Check aria-hidden="true" /> {filteredServices.length} layanan
                tampil
              </span>
            </div>

            <nav className="mpp-filters" aria-label="Filter instansi">
              <Link
                href={directoryHref()}
                aria-current={!selectedAgency ? 'page' : undefined}
              >
                Semua layanan
              </Link>
              {agencies.map((agency) => (
                <Link
                  key={agency.id}
                  href={directoryHref(agency.id)}
                  aria-current={
                    selectedAgency === agency.id ? 'page' : undefined
                  }
                >
                  {agency.name}
                </Link>
              ))}
            </nav>

            {filteredServices.length ? (
              <div className="mpp-service-grid">
                {filteredServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={detailHref(service.slug)}
                    className="mpp-service-card"
                  >
                    <div className="mpp-card-top">
                      <span className="mpp-service-icon">
                        <Building2 aria-hidden="true" />
                      </span>
                      <ArrowUpRight aria-hidden="true" />
                    </div>
                    <span className="mpp-card-agency">{service.agency}</span>
                    <h3>{service.name}</h3>
                    <p>
                      {service.requirement.length} persyaratan <span>·</span>{' '}
                      {service.fee}
                    </p>
                    <div className="mpp-card-meta">
                      <span>
                        <Clock3 aria-hidden="true" /> {service.duration}
                      </span>
                      <span>
                        <MapPin aria-hidden="true" /> {service.zone}
                      </span>
                      <span>
                        <Users aria-hidden="true" /> {service.queue} menunggu
                      </span>
                    </div>
                    <span className="mpp-card-action">
                      Lihat persyaratan <ArrowRight aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mpp-empty-services">
                <span className="mpp-empty-services-icon">
                  <Search aria-hidden="true" />
                </span>
                <h3>Layanan belum ditemukan.</h3>
                <p>
                  Coba kata yang lebih umum atau hapus pencarian untuk melihat
                  layanan lain.
                </p>
                <Link href={directoryHref(selectedAgency, false)}>
                  Hapus pencarian <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        </section>

        <section
          className="mpp-queue-cta mpp-container"
          aria-labelledby="queue-heading"
        >
          <div>
            <span className="mpp-eyebrow">SUDAH DI GEDUNG MPP?</span>
            <h2 id="queue-heading">Siap mengambil antrean?</h2>
            <p>Gunakan kiosk saat Anda tiba di gedung MPP.</p>
          </div>
          <span
            className="mpp-primary-button"
            aria-label="Ambil antrean melalui kiosk di gedung MPP"
          >
            Ambil di kiosk saat tiba
          </span>
        </section>
      </main>
      <PublicFooter scenario={scenario.id} label={scenario.label} />
    </div>
  );
}
