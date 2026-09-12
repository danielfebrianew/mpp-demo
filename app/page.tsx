import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Clock3,
  FileCheck2,
  HeartHandshake,
  Landmark,
  MapPin,
  Ticket,
  Users,
} from 'lucide-react';
import {
  GuideSteps,
  HomeHeader,
  HomeHero,
  PublicFooter,
  Reveal,
} from '@/components/home-experience';
import {
  agencies,
  getScenarioData,
  getScenarioServices,
  popularServices,
  scenarioHref,
} from '@/lib/mpp-data';
import styles from './home.module.css';

export const metadata: Metadata = { icons: { icon: '/favicon.svg' } };

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ scenario?: string | string[] }>;
}) {
  const query = await searchParams;
  const scenario = getScenarioData(query.scenario);
  const services = getScenarioServices(scenario.id);
  const icons = [FileCheck2, Users, Building2, Landmark];

  return (
    <div className={styles.home}>
      <HomeHeader scenario={scenario.id} />
      <main id="main-content">
        <HomeHero
          scenario={scenario.id}
          services={services}
          notice={
            scenario.system.tone === 'warning' ||
            scenario.system.tone === 'danger'
              ? scenario.system
              : undefined
          }
        />
        <section
          className={styles.statusStrip}
          aria-label="Informasi operasional"
        >
          <div className={styles.container}>
            <div
              className={styles.statusLabel}
              data-tone={scenario.system.tone}
            >
              <span className={styles.statusDot} />
              <div>
                <strong>{scenario.system.label}</strong>
                <span>{scenario.system.detail}</span>
              </div>
            </div>
            <div className={styles.quickInfo}>
              <Clock3 aria-hidden="true" />
              <span>
                Senin-Kamis<strong>08.00-15.30 WIB</strong>
              </span>
            </div>
            <a href="#kunjungan" className={styles.quickInfo}>
              <MapPin aria-hidden="true" />
              <span>
                Gedung MPP
                <strong>
                  Lantai 1-2 <ArrowUpRight aria-hidden="true" />
                </strong>
              </span>
            </a>
          </div>
        </section>
        <section
          id="layanan"
          className={`${styles.section} ${styles.container}`}
          aria-labelledby="services-heading"
        >
          <Reveal>
            <div className={styles.sectionIntro}>
              <span className={styles.eyebrow}>MULAI DARI KEBUTUHAN ANDA</span>
              <h2 id="services-heading">Ada yang bisa kami bantu?</h2>
              <p>
                Temukan layanan dan siapkan persyaratannya sebelum berangkat.
              </p>
            </div>
          </Reveal>
          <div className={styles.serviceGrid}>
            {popularServices.map((item, index) => {
              const service = services.find(
                (entry) => entry.slug === item.slug,
              )!;
              const Icon = icons[index];
              return (
                <Reveal key={service.slug} delay={index * 0.04}>
                  <Link
                    href={scenarioHref(
                      `/layanan?query=${encodeURIComponent(service.name)}`,
                      scenario.id,
                    )}
                    className={`${styles.serviceCard} ${index === 0 ? styles.serviceCardFeatured : ''}`}
                  >
                    <div className={styles.cardTop}>
                      <span className={styles.serviceIcon}>
                        <Icon aria-hidden="true" />
                      </span>
                      <span className={styles.previewLabel}>Populer</span>
                    </div>
                    <span className={styles.agencyLabel}>{service.agency}</span>
                    <h3>{service.name}</h3>
                    <p>
                      {service.requirement.length} persyaratan <span>·</span>{' '}
                      {service.fee}
                    </p>
                    <span className={styles.cardAction}>
                      Buka di direktori <ArrowRight aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <Link
            href={scenarioHref('/layanan', scenario.id)}
            className={styles.directoryLink}
          >
            Buka direktori layanan <ArrowRight aria-hidden="true" />
          </Link>
        </section>
        <section
          id="panduan"
          className={styles.guideSection}
          aria-labelledby="guide-heading"
        >
          <div className={`${styles.container} ${styles.guideGrid}`}>
            <Reveal className={styles.guidePhoto}>
              <Image
                src="/images/mpp-service-hall.webp"
                alt="Ruang pelayanan MPP dengan tempat duduk warga dan petugas di loket"
                fill
                sizes="(max-width: 767px) 100vw, 48vw"
                className={styles.hallImage}
              />
            </Reveal>
            <div className={styles.guideContent}>
              <Reveal>
                <h2 id="guide-heading">
                  Datang lebih siap.
                  <br />
                  Pulang lebih tenang.
                </h2>
                <p>Urus keperluan Anda dalam tiga langkah sederhana.</p>
              </Reveal>
              <GuideSteps scenario={scenario.id} />
              <Link
                href={scenarioHref('/panduan-kunjungan', scenario.id)}
                className={styles.sectionPageLink}
              >
                Baca panduan lengkap <ArrowRight aria-hidden="true" />
              </Link>
              <div className={styles.assistance}>
                <HeartHandshake aria-hidden="true" />
                <p>
                  Butuh pendampingan? Petugas helpdesk siap membantu, termasuk
                  untuk layanan prioritas.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="antrean"
          className={`${styles.section} ${styles.container}`}
          aria-labelledby="queue-heading"
        >
          <Reveal>
            <div className={styles.queueHeading}>
              <h2 id="queue-heading">Ketahui antrean sebelum berangkat.</h2>
              <p>
                Gambaran pelayanan di gedung MPP untuk membantu merencanakan
                kunjungan Anda.
              </p>
            </div>
          </Reveal>
          <div className={styles.queuePanel}>
            <div className={styles.queueOverview}>
              <span className={styles.snapshot}>
                Data demo · {scenario.updatedAt}
              </span>
              <div className={styles.metrics}>
                {[
                  { value: scenario.totals.waiting, label: 'Sedang menunggu' },
                  { value: scenario.totals.serving, label: 'Sedang dilayani' },
                  {
                    value: scenario.totals.completed,
                    label: 'Selesai hari ini',
                  },
                ].map((stat) => (
                  <div key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
              <div className={styles.waitNote}>
                <Clock3 aria-hidden="true" />
                <span>
                  Rata-rata waktu tunggu{' '}
                  <strong>{scenario.totals.averageWait} menit.</strong> Dapat
                  berubah sesuai kondisi layanan.
                </span>
              </div>
            </div>
            <div className={styles.ticketPrompt}>
              <Ticket aria-hidden="true" />
              <h3>Sudah punya tiket?</h3>
              <p>Lihat posisi antrean dan loket tujuan Anda.</p>
              <p className={styles.ticketInstruction}>
                Buka tautan dari QR pada tiket Anda untuk memantau giliran di
                HP.
              </p>
            </div>
          </div>
        </section>
        <section
          className={styles.agencySection}
          aria-labelledby="agency-heading"
        >
          <div className={styles.container}>
            <Reveal>
              <div className={styles.sectionIntro}>
                <h2 id="agency-heading">Banyak keperluan. Satu tujuan.</h2>
                <p>Enam instansi terhubung dalam satu Mal Pelayanan Publik.</p>
              </div>
            </Reveal>
            <div className={styles.agencyGrid}>
              {agencies.map((agency) => (
                <Link
                  key={agency.id}
                  href={scenarioHref(
                    `/layanan?agency=${agency.id}`,
                    scenario.id,
                  )}
                  className={styles.agencyItem}
                >
                  <Building2 aria-hidden="true" />
                  <span>
                    <h3>{agency.name}</h3>
                    <p>{agency.description}</p>
                    <span className={styles.agencyCount}>
                      {agency.serviceCount} layanan{' '}
                      <ArrowUpRight aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section
          id="kunjungan"
          className={`${styles.section} ${styles.container} ${styles.visitSection}`}
          aria-labelledby="visit-heading"
        >
          <Reveal>
            <span className={styles.eyebrow}>SAMPAI JUMPA DI MPP</span>
            <h2 id="visit-heading">
              Pelayanan yang dekat
              <br />
              dengan warga.
            </h2>
            <p>
              Gedung MPP Kabupaten Wakanda, Lantai 1-2.
              <br />
              Senin-Kamis, pukul 08.00-15.30 WIB.
            </p>
            <div className={styles.visitActions}>
              <Link
                href={scenarioHref('/lokasi-jam', scenario.id)}
                className={styles.primarySectionLink}
              >
                Lihat detail lokasi &amp; jam <ArrowRight aria-hidden="true" />
              </Link>
              <Link
                href={scenarioHref('/#panduan', scenario.id)}
                className={styles.supportingLink}
              >
                Ringkasan panduan
              </Link>
            </div>
          </Reveal>
          <div className={styles.visitChecklist}>
            <h3>Sebelum berangkat</h3>
            {[
              'Periksa persyaratan layanan tujuan',
              'Siapkan dokumen asli dan salinan',
              'Cek kondisi antrean di beranda',
            ].map((item) => (
              <p key={item}>
                <Check aria-hidden="true" />
                {item}
              </p>
            ))}
            <div>
              <Ticket aria-hidden="true" />
              <span>
                Sudah di gedung MPP?
                <strong>Ambil nomor melalui kiosk di lobi utama.</strong>
              </span>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter scenario={scenario.id} label={scenario.label} />
    </div>
  );
}
