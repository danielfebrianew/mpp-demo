import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  Building2,
  BusFront,
  CircleParking,
  Clock3,
  Info,
  MapPin,
} from 'lucide-react';
import { HomeHeader, PublicFooter } from '@/components/home-experience';
import { getScenarioData, scenarioHref } from '@/lib/mpp-data';
import homeStyles from '../home.module.css';
import styles from '../information.module.css';

export const metadata: Metadata = {
  title: 'Lokasi & Jam | MPP Kabupaten Wakanda',
  description:
    'Informasi lokasi, zona gedung, jam pelayanan, akses, dan titik bantuan MPP Kabupaten Wakanda.',
};

const arrivalDetails = [
  {
    icon: Building2,
    title: 'Masuk melalui lobi utama',
    items: [
      'Kiosk antrean dan helpdesk berada di area lobi.',
      'Ikuti penanda Zona A, B, atau C pada tiket.',
    ],
  },
  {
    icon: BusFront,
    title: 'Titik turun pengunjung',
    items: [
      'Gunakan area drop-off di depan pintu utama.',
      'Pastikan barang dan dokumen tidak tertinggal.',
    ],
  },
  {
    icon: Accessibility,
    title: 'Akses yang didampingi',
    items: [
      'Minta bantuan petugas sejak area masuk.',
      'Rute akses menuju helpdesk dan ruang tunggu tersedia.',
    ],
  },
];

export default async function LocationHoursPage({
  searchParams,
}: {
  searchParams: Promise<{ scenario?: string | string[] }>;
}) {
  const query = await searchParams;
  const scenario = getScenarioData(query.scenario);

  return (
    <div className={`${homeStyles.home} ${styles.page}`}>
      <HomeHeader scenario={scenario.id} />
      <main id="main-content" className={styles.main}>
        <section className={`${styles.container} ${styles.hero}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>LOKASI &amp; JAM PELAYANAN</span>
            <h1>Rencanakan waktu kedatangan.</h1>
            <p className={styles.lead}>
              Kenali lokasi gedung, jam pelayanan, zona tujuan, dan titik
              bantuan sebelum Anda berangkat ke MPP.
            </p>
            <Link
              href={scenarioHref('/#kunjungan', scenario.id)}
              className={styles.backLink}
            >
              <ArrowLeft aria-hidden="true" /> Kembali ke ringkasan beranda
            </Link>
          </div>
          <aside className={styles.heroCard} aria-label="Alamat MPP">
            <span className={styles.heroIcon}>
              <MapPin aria-hidden="true" />
            </span>
            <div className={styles.heroCardContent}>
              <span className={styles.heroCardLabel}>Tujuan kunjungan</span>
              <strong>Gedung MPP Kabupaten Wakanda.</strong>
              <p>Lantai 1–2 · Kiosk dan helpdesk di lobi utama.</p>
              <div className={styles.status}>
                <Info aria-hidden="true" />
                <span>
                  <b>{scenario.system.label}</b>
                  {scenario.system.detail} · diperbarui {scenario.updatedAt}
                </span>
              </div>
            </div>
          </aside>
        </section>

        <section className={styles.section} aria-labelledby="hours-heading">
          <div className={`${styles.container} ${styles.split}`}>
            <div className={styles.panel}>
              <span className={styles.eyebrow}>JADWAL DEMO</span>
              <h2 id="hours-heading">Jam pelayanan.</h2>
              <p>
                Datang lebih awal agar tersedia waktu untuk mengambil antrean,
                menemukan zona, dan memeriksa dokumen.
              </p>
              <div className={styles.schedule}>
                <div className={styles.scheduleRow}>
                  <span>Senin–Kamis</span>
                  <strong>08.00–15.30 WIB</strong>
                </div>
                <div className={styles.scheduleRow}>
                  <span>Zona layanan</span>
                  <strong>Lantai 1–2</strong>
                </div>
                <div className={styles.scheduleRow}>
                  <span>Kiosk &amp; bantuan</span>
                  <strong>Lobi utama</strong>
                </div>
              </div>
              <p className={styles.demoNote}>
                Informasi ini adalah data prototype. Waktu terakhir pengambilan
                antrean dan perubahan hari libur belum tersedia sebagai data
                resmi pada demo.
              </p>
            </div>
            <aside className={styles.supportPanel}>
              <span className={styles.supportIcon}>
                <Clock3 aria-hidden="true" />
              </span>
              <h2>Status hari ini.</h2>
              <p>{scenario.system.detail}.</p>
              <div className={styles.infoRows}>
                <div className={styles.infoRow}>
                  <span className={styles.infoRowIcon}>
                    <Info aria-hidden="true" />
                  </span>
                  <span>
                    <strong>{scenario.system.label}</strong>
                    <span>
                      Snapshot diperbarui {scenario.updatedAt}. Periksa kembali
                      sebelum berangkat.
                    </span>
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="arrival-heading">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <h2 id="arrival-heading">Setibanya di gedung.</h2>
              <p>
                Mulai dari lobi utama. Petunjuk area dan petugas helpdesk akan
                mengarahkan Anda ke kiosk, ruang tunggu, dan zona layanan.
              </p>
            </div>
            <div className={styles.detailGrid}>
              {arrivalDetails.map((detail) => {
                const Icon = detail.icon;
                return (
                  <article className={styles.detailCard} key={detail.title}>
                    <div className={styles.cardTop}>
                      <Icon aria-hidden="true" />
                    </div>
                    <h3>{detail.title}</h3>
                    <ul>
                      {detail.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.container}`}
          aria-labelledby="facility-heading"
        >
          <div className={styles.panel}>
            <h2 id="facility-heading">Titik yang perlu Anda cari.</h2>
            <p>
              Gunakan tiga titik berikut sebagai orientasi saat pertama masuk ke
              gedung.
            </p>
            <div className={styles.infoRows}>
              <div className={styles.infoRow}>
                <span className={styles.infoRowIcon}>
                  <MapPin aria-hidden="true" />
                </span>
                <span>
                  <strong>Helpdesk lobi</strong>
                  <span>
                    Tempat bertanya layanan, persyaratan, zona tujuan, dan
                    pendampingan prioritas.
                  </span>
                </span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoRowIcon}>
                  <CircleParking aria-hidden="true" />
                </span>
                <span>
                  <strong>Area drop-off</strong>
                  <span>
                    Titik turun terdekat dengan pintu utama bagi pengunjung dan
                    pendamping.
                  </span>
                </span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoRowIcon}>
                  <Accessibility aria-hidden="true" />
                </span>
                <span>
                  <strong>Rute akses</strong>
                  <span>
                    Minta petugas mengarahkan ke jalur yang paling sesuai dengan
                    kebutuhan mobilitas Anda.
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`${styles.container} ${styles.closing}`}
          aria-labelledby="location-next-heading"
        >
          <div>
            <h2 id="location-next-heading">Sudah tahu kapan akan datang?</h2>
            <p>
              Periksa panduan kunjungan dan persyaratan layanan sebelum
              berangkat.
            </p>
          </div>
          <div className={styles.actions}>
            <Link
              href={scenarioHref('/panduan-kunjungan', scenario.id)}
              className={styles.primaryLink}
            >
              Baca panduan <ArrowRight aria-hidden="true" />
            </Link>
            <Link
              href={scenarioHref('/layanan', scenario.id)}
              className={styles.secondaryLink}
            >
              Pilih layanan
            </Link>
          </div>
        </section>
      </main>
      <PublicFooter scenario={scenario.id} label={scenario.label} />
    </div>
  );
}
