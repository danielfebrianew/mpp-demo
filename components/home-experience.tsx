'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {
  AlertCircle,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Landmark,
  Menu,
  Search,
  X,
} from 'lucide-react';
import {
  scenarioHref,
  type Scenario,
  type getScenarioServices,
} from '@/lib/mpp-data';
import styles from '@/app/home.module.css';

const navigation = [
  { href: '/#beranda', label: 'Beranda', section: 'beranda' },
  { href: '/#layanan', label: 'Layanan', section: 'layanan' },
  { href: '/#panduan', label: 'Panduan kunjungan', section: 'panduan' },
  { href: '/#kunjungan', label: 'Lokasi & jam', section: 'kunjungan' },
] as const;

const visitSteps = [
  {
    title: 'Pilih layanan, siapkan dokumen',
    description:
      'Periksa persyaratan, biaya, serta lokasi loket layanan yang Anda butuhkan. Bawa dokumen asli dan salinan sesuai ketentuan.',
    href: '/layanan',
    linkLabel: 'Periksa persyaratan',
  },
  {
    title: 'Datang dan ambil nomor antrean',
    description:
      'Setibanya di gedung MPP, pilih layanan di kiosk dan simpan tiket Anda. Minta bantuan petugas jika membutuhkan pendampingan.',
    href: '/#kunjungan',
    linkLabel: 'Lihat lokasi dan jam buka',
  },
  {
    title: 'Pantau giliran, menuju loket',
    description:
      'Pindai QR pada tiket untuk memantau giliran dari HP. Saat nomor dipanggil, menuju loket yang tertera dan tunjukkan dokumen Anda.',
    href: '/#antrean',
    linkLabel: 'Pelajari cara memantau',
  },
];

export function GuideSteps({ scenario }: { scenario: Scenario }) {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className={styles.steps}>
      {visitSteps.map((step, index) => {
        const isExpanded = expandedIndex === index;
        const panelId = `visit-step-panel-${index + 1}`;

        return (
          <motion.div
            layout
            transition={transition}
            className={styles.step}
            key={step.title}
          >
            <button
              type="button"
              className={styles.stepTrigger}
              aria-expanded={isExpanded}
              aria-controls={panelId}
              onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
            >
              <span className={styles.stepNumber}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{step.title}</h3>
              <ChevronDown
                aria-hidden="true"
                className={isExpanded ? styles.stepChevronOpen : undefined}
              />
            </button>
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.section
                  id={panelId}
                  aria-label={step.title}
                  initial={
                    prefersReducedMotion ? false : { height: 0, opacity: 0 }
                  }
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={
                    prefersReducedMotion ? undefined : { height: 0, opacity: 0 }
                  }
                  transition={transition}
                  className={styles.stepPanel}
                >
                  <div className={styles.stepBody}>
                    <p>{step.description}</p>
                    <Link href={scenarioHref(step.href, scenario)}>
                      {step.linkLabel} <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export function PublicFooter({
  scenario,
  label,
}: {
  scenario: Scenario;
  label: string;
}) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link href={scenarioHref('/', scenario)} className={styles.footerBrand}>
          <Landmark aria-hidden="true" />
          MPP Kabupaten Wakanda
        </Link>
        <p>Portal pelayanan warga</p>
        <span>Snapshot “{label}”. Bukan layanan pemerintah sebenarnya.</span>
      </div>
    </footer>
  );
}

export function HomeHeader({ scenario }: { scenario: Scenario }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(isHome ? 'beranda' : '');
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isHome) return;

    const sections = navigation
      .map((item) => document.getElementById(item.section))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      {
        rootMargin: '-18% 0px -58% 0px',
        threshold: [0, 0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!menuOpen) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', dismiss);
    return () => document.removeEventListener('keydown', dismiss);
  }, [menuOpen]);
  return (
    <header className={styles.header}>
      <Link href={scenarioHref('/', scenario)} className={styles.brand}>
        <span className={styles.brandIcon}>
          <Landmark aria-hidden="true" />
        </span>
        <span>
          <strong>MPP Kabupaten Wakanda</strong>
          <small>Portal pelayanan warga</small>
        </span>
      </Link>
      <nav aria-label="Navigasi utama" className={styles.desktopNav}>
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={scenarioHref(item.href, scenario)}
            aria-current={
              isHome && item.section === activeSection ? 'location' : undefined
            }
            onClick={() => setActiveSection(item.section)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className={styles.headerActions}>
        <Link
          href={scenarioHref('/#antrean', scenario)}
          className={styles.headerCta}
        >
          Cek antrean <ArrowUpRight aria-hidden="true" />
        </Link>
        <button
          ref={menuButton}
          type="button"
          className={styles.menuButton}
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={menuOpen}
          aria-controls="home-mobile-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {menuOpen && (
        <nav
          id="home-mobile-nav"
          aria-label="Navigasi seluler"
          className={styles.mobileNav}
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={scenarioHref(item.href, scenario)}
              aria-current={
                isHome && item.section === activeSection
                  ? 'location'
                  : undefined
              }
              onClick={() => {
                setActiveSection(item.section);
                setMenuOpen(false);
              }}
            >
              {item.label}
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function HomeHero({
  scenario,
  services,
  notice,
}: {
  notice?: { label: string; detail: string };
  scenario: Scenario;
  services: ReturnType<typeof getScenarioServices>;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.055]);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const tokens = query
    .trim()
    .toLocaleLowerCase('id')
    .split(/\s+/)
    .filter(Boolean);
  const aliases: Record<string, string> = {
    'perubahan-kartu-keluarga': 'kk keluarga',
    'konsultasi-nib': 'izin usaha bisnis oss',
    'pajak-bumi-bangunan': 'pbb pajak rumah',
    'kepesertaan-bpjs': 'bpjs jaminan kesehatan kis',
  };
  const results = services.filter((service) =>
    tokens.every((token) =>
      `${service.name} ${service.agency} ${aliases[service.slug] ?? ''}`
        .toLocaleLowerCase('id')
        .includes(token),
    ),
  );

  return (
    <section
      id="beranda"
      ref={ref}
      className={styles.hero}
      aria-labelledby="hero-heading"
    >
      <div className={styles.heroBackdrop}>
        <motion.div
          className={styles.heroLandscape}
          style={reduce ? undefined : { y, scale }}
        >
          <Image
            src="/images/wakanda-landscape.avif"
            alt=""
            fill
            priority
            unoptimized
            className={styles.landscapeImage}
          />
        </motion.div>
        <div className={styles.heroShade} />
      </div>
      <div className={styles.heroContent}>
        <span className={styles.heroEyebrow}>
          MAL PELAYANAN PUBLIK KABUPATEN WAKANDA
        </span>
        <h1 id="hero-heading">
          Lebih dekat.
          <br />
          Lebih mudah.
        </h1>
        <p>
          Satu tempat untuk berbagai keperluan Anda.
          <br />
          Siapkan urusan dari rumah, datang dengan tenang.
        </p>
        <search
          aria-label="Cari layanan publik"
          className={styles.searchArea}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              setOpen(false);
          }}
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(true);
            }}
            className={styles.heroSearch}
          >
            <Search aria-hidden="true" />
            <label htmlFor="home-service-search" className={styles.srOnly}>
              Layanan apa yang Anda butuhkan?
            </label>
            <input
              ref={input}
              id="home-service-search"
              type="search"
              autoComplete="off"
              onKeyDown={(event) => {
                if (event.key === 'Escape') setOpen(false);
              }}
              placeholder="Cari layanan..."
              value={query}
              aria-controls={open ? 'home-search-results' : undefined}
              onChange={(event) => {
                setQuery(event.target.value);
                setOpen(true);
              }}
              onFocus={() => {
                if (query) setOpen(true);
              }}
            />
            <button type="submit">
              Cari layanan <ArrowRight aria-hidden="true" />
            </button>
          </form>
          {open && (
            <div id="home-search-results" className={styles.searchResults}>
              <div className={styles.resultsHeader}>
                <output aria-live="polite">
                  {results.length
                    ? `${results.length} layanan ${query.trim() ? 'ditemukan' : 'tersedia'}`
                    : 'Layanan belum ditemukan'}
                </output>
                <button
                  type="button"
                  aria-label="Tutup hasil pencarian"
                  onClick={() => {
                    input.current?.focus();
                    setOpen(false);
                  }}
                >
                  <X />
                </button>
              </div>
              {results.length ? (
                <ul>
                  {results.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={scenarioHref(
                          `/layanan/${service.slug}`,
                          scenario,
                        )}
                      >
                        <span>
                          <strong>{service.name}</strong>
                          <small>
                            {service.agency} · {service.zone}
                          </small>
                        </span>
                        <ArrowUpRight aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={styles.emptySearch}>
                  <p>Coba kata lain seperti “KTP”, “KK”, atau “BPJS”.</p>
                  <Link href={scenarioHref('/layanan', scenario)}>
                    Lihat direktori layanan <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              )}
            </div>
          )}
        </search>
        <div className={styles.heroShortcuts}>
          <span>Sering dicari:</span>
          <Link href={scenarioHref('/layanan/perekaman-ktp', scenario)}>
            KTP-el
          </Link>
          <Link
            href={scenarioHref('/layanan/perubahan-kartu-keluarga', scenario)}
          >
            Kartu Keluarga
          </Link>
          <Link href={scenarioHref('/layanan/konsultasi-nib', scenario)}>
            Izin usaha
          </Link>
        </div>
      </div>
      {notice && (
        <a href="#antrean" className={styles.heroNotice}>
          <AlertCircle aria-hidden="true" />
          <span>
            <strong>{notice.label}</strong>
            <small>{notice.detail}</small>
          </span>
          <ArrowRight aria-hidden="true" />
        </a>
      )}
      <a href="#layanan" className={styles.heroExplore}>
        Jelajahi layanan <ArrowDown aria-hidden="true" />
      </a>
      <span className={styles.heroCaption}>
        Untuk setiap warga, di setiap langkah.
      </span>
    </section>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduce ? undefined : { y: [18, 0] }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
