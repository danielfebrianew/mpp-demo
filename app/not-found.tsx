import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Landmark, MapPin, Search } from 'lucide-react';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Halaman tidak ditemukan | MPP Kabupaten Wakanda',
  description:
    'Halaman yang Anda tuju tidak tersedia di Portal MPP Kabupaten Wakanda.',
};

export default function NotFound() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link
          href="/"
          className={styles.brand}
          aria-label="Kembali ke Beranda MPP Wakanda"
        >
          <span className={styles.brandMark}>
            <Landmark aria-hidden="true" />
          </span>
          <span>
            <strong>MPP Kabupaten Wakanda</strong>
            <small>Portal pelayanan warga</small>
          </span>
        </Link>
        <Link href="/layanan" className={styles.headerLink}>
          <Search aria-hidden="true" />
          Cari layanan
        </Link>
      </header>

      <main id="main-content" className={styles.main}>
        <section className={styles.copy} aria-labelledby="not-found-title">
          <span className={styles.code}>404</span>
          <p className={styles.kicker}>HALAMAN TIDAK DITEMUKAN</p>
          <h1 id="not-found-title">Tujuan Anda belum ada di peta.</h1>
          <p className={styles.description}>
            Tautannya mungkin sudah berubah, atau alamat yang dimasukkan belum
            tepat. Mari mulai lagi dari halaman yang tersedia.
          </p>
          <div className={styles.actions}>
            <Link href="/" className={styles.primaryAction}>
              Kembali ke beranda <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/layanan" className={styles.secondaryAction}>
              Lihat semua layanan
            </Link>
          </div>
          <p className={styles.helpNote}>
            <MapPin aria-hidden="true" />
            Butuh bantuan langsung? Kunjungi helpdesk di Lantai 1 gedung MPP.
          </p>
        </section>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.ringOne} />
          <div className={styles.ringTwo} />
          <Image
            src="/images/not-found-wayfinding.png"
            alt=""
            width={1024}
            height={1280}
            priority
            className={styles.illustration}
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <span>MPP Kabupaten Wakanda</span>
        <span>Informasi pelayanan yang lebih mudah dijangkau.</span>
      </footer>
    </div>
  );
}
