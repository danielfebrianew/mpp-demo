import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  BadgeHelp,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  MapPin,
  ScanLine,
  Smartphone,
} from 'lucide-react';
import { HomeHeader, PublicFooter } from '@/components/home-experience';
import { getScenarioData, scenarioHref } from '@/lib/mpp-data';
import homeStyles from '../home.module.css';
import styles from '../information.module.css';

export const metadata: Metadata = {
  title: 'Panduan Kunjungan | MPP Kabupaten Wakanda',
  description:
    'Panduan menyiapkan dokumen, mengambil antrean, dan mendapatkan bantuan saat berkunjung ke MPP Kabupaten Wakanda.',
};

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Sebelum berangkat',
    items: [
      'Pilih layanan dan baca seluruh persyaratannya.',
      'Siapkan dokumen asli serta salinan yang diminta.',
      'Periksa kondisi antrean dan jam pelayanan hari itu.',
    ],
  },
  {
    icon: ScanLine,
    title: 'Saat tiba di MPP',
    items: [
      'Datang ke lobi utama dan ikuti penunjuk zona layanan.',
      'Ambil nomor antrean melalui kiosk yang tersedia.',
      'Simpan tiket karena nomor dan QR dipakai selama kunjungan.',
    ],
  },
  {
    icon: Smartphone,
    title: 'Saat menunggu',
    items: [
      'Pindai QR pada tiket untuk memantau antrean dari HP.',
      'Perhatikan display dan suara panggilan di ruang tunggu.',
      'Saat dipanggil, menuju loket yang tertulis pada tiket.',
    ],
  },
];

export default async function VisitGuidePage({
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
            <span className={styles.eyebrow}>PANDUAN KUNJUNGAN</span>
            <h1>Datang dengan persiapan yang tepat.</h1>
            <p className={styles.lead}>
              Ikuti alur sederhana dari rumah sampai loket agar dokumen siap,
              antrean mudah dipantau, dan kunjungan terasa lebih tenang.
            </p>
            <Link
              href={scenarioHref('/#panduan', scenario.id)}
              className={styles.backLink}
            >
              <ArrowLeft aria-hidden="true" /> Kembali ke ringkasan beranda
            </Link>
          </div>
          <aside className={styles.heroCard} aria-label="Ringkasan kunjungan">
            <span className={styles.heroIcon}>
              <FileCheck2 aria-hidden="true" />
            </span>
            <div className={styles.heroCardContent}>
              <span className={styles.heroCardLabel}>Alur utama</span>
              <strong>Tiga tahap, dari dokumen sampai loket.</strong>
              <p>Gunakan halaman ini sebagai checklist sebelum berangkat.</p>
              <div className={styles.status}>
                <Clock3 aria-hidden="true" />
                <span>
                  <b>{scenario.system.label}</b>
                  {scenario.system.detail} · diperbarui {scenario.updatedAt}
                </span>
              </div>
            </div>
          </aside>
        </section>

        <section
          className={styles.section}
          aria-labelledby="guide-flow-heading"
        >
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <h2 id="guide-flow-heading">
                Alur kunjungan, langkah demi langkah.
              </h2>
              <p>
                Persiapan yang baik mengurangi risiko harus kembali karena
                dokumen kurang dan membantu petugas melayani lebih cepat.
              </p>
            </div>
            <div className={styles.stepGrid}>
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article className={styles.stepCard} key={step.title}>
                    <div className={styles.cardTop}>
                      <span className={styles.number}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <Icon aria-hidden="true" />
                    </div>
                    <h3>{step.title}</h3>
                    <ul>
                      {step.items.map((item) => (
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
          aria-label="Bantuan kunjungan"
        >
          <div className={styles.split}>
            <div className={styles.panel}>
              <h2>Saat nomor Anda dipanggil.</h2>
              <p>
                Cocokkan nomor pada tiket dengan display, lalu menuju loket dan
                siapkan dokumen agar mudah diserahkan kepada petugas.
              </p>
              <div className={styles.infoRows}>
                <div className={styles.infoRow}>
                  <span className={styles.infoRowIcon}>
                    <Smartphone aria-hidden="true" />
                  </span>
                  <span>
                    <strong>Pantau dari HP</strong>
                    <span>
                      QR pada tiket membuka status antrean tanpa perlu tetap
                      berdiri di depan display.
                    </span>
                  </span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoRowIcon}>
                    <MapPin aria-hidden="true" />
                  </span>
                  <span>
                    <strong>Ikuti zona layanan</strong>
                    <span>
                      Nama loket, lantai, dan zona tujuan tercantum pada tiket
                      antrean.
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <aside className={styles.supportPanel}>
              <span className={styles.supportIcon}>
                <Accessibility aria-hidden="true" />
              </span>
              <h2>Butuh pendampingan?</h2>
              <p>
                Sampaikan kebutuhan kepada petugas helpdesk di lobi.
                Pendampingan tersedia untuk warga prioritas dan pengguna yang
                memerlukan bantuan akses.
              </p>
              <div className={styles.infoRows}>
                <div className={styles.infoRow}>
                  <span className={styles.infoRowIcon}>
                    <BadgeHelp aria-hidden="true" />
                  </span>
                  <span>
                    <strong>Mulai dari helpdesk</strong>
                    <span>
                      Petugas membantu menentukan layanan, zona, dan alur
                      antrean yang tepat.
                    </span>
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section
          className={`${styles.container} ${styles.closing}`}
          aria-labelledby="guide-next-heading"
        >
          <div>
            <h2 id="guide-next-heading">Siapkan layanan sebelum berangkat.</h2>
            <p>Periksa persyaratan atau lihat lokasi dan jam pelayanan MPP.</p>
          </div>
          <div className={styles.actions}>
            <Link
              href={scenarioHref('/layanan', scenario.id)}
              className={styles.primaryLink}
            >
              Pilih layanan <ArrowRight aria-hidden="true" />
            </Link>
            <Link
              href={scenarioHref('/lokasi-jam', scenario.id)}
              className={styles.secondaryLink}
            >
              Lokasi &amp; jam
            </Link>
          </div>
        </section>
      </main>
      <PublicFooter scenario={scenario.id} label={scenario.label} />
    </div>
  );
}
