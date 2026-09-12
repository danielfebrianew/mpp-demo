'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Clock3, Landmark, Menu, X } from 'lucide-react';
import { getScenarioData, scenarioHref } from '@/lib/mpp-data';
import {
  isPublicNavigationActive,
  publicNavigation,
} from '@/lib/public-navigation';

export function PublicHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const scenario = getScenarioData(searchParams.get('scenario'));
  const statusClass =
    scenario.system.tone === 'danger'
      ? 'bg-red-50 text-red-700'
      : scenario.system.tone === 'warning'
        ? 'bg-amber-50 text-amber-700'
        : scenario.system.tone === 'priority'
          ? 'bg-orange-50 text-orange-700'
          : 'bg-emerald-50 text-emerald-700';

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
    <header className="relative border-b border-zinc-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-18 max-w-350 items-center justify-between gap-5">
        <Link
          href={scenarioHref('/', scenario.id)}
          className="interactive flex min-w-0 items-center gap-3 rounded-xl focus-visible:ring-2 focus-visible:ring-zinc-400"
          aria-label="Beranda MPP Wakanda"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-zinc-950 text-white shadow-sm">
            <Landmark className="size-4.75" strokeWidth={1.8} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold tracking-[-0.01em]">
              MPP Kabupaten Wakanda
            </span>
            <span className="block text-xs text-zinc-500">
              Portal pelayanan warga
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-xl bg-zinc-100 p-1 lg:flex"
          aria-label="Navigasi utama"
        >
          {publicNavigation.map((item) => {
            const active = isPublicNavigationActive(pathname, item);
            return (
              <Link
                key={item.href}
                href={scenarioHref(item.href, scenario.id)}
                aria-current={active ? 'page' : undefined}
                className={`interactive rounded-lg px-4 py-2 text-sm text-zinc-500 hover:bg-white hover:text-zinc-950 ${active ? 'bg-white font-medium text-zinc-950 shadow-sm' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span
            className={`hidden max-w-52 items-center gap-2 truncate rounded-xl px-3 py-2 text-xs font-medium sm:flex ${statusClass}`}
            title={scenario.system.detail}
          >
            <Clock3 className="size-3.5 shrink-0" />{' '}
            <span className="truncate">{scenario.system.label}</span>
          </span>
          <Link
            href={scenarioHref('/#antrean', scenario.id)}
            className="interactive inline-flex h-10 items-center rounded-xl [background:var(--home-gradient)] px-3 text-xs font-semibold text-white shadow-[0_10px_24px_#28665d24] hover:-translate-y-0.5 hover:[background:var(--home-gradient-hover)] sm:px-4 sm:text-sm"
          >
            Cek antrean
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="interactive grid size-10 shrink-0 place-items-center rounded-xl text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 lg:hidden"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
            aria-controls="public-mobile-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="size-4.5" />
            ) : (
              <Menu className="size-4.5" />
            )}
          </button>
        </div>
      </div>
      {menuOpen ? (
        <nav
          id="public-mobile-nav"
          className="absolute inset-x-4 top-[calc(100%+0.5rem)] z-30 grid gap-1 rounded-2xl border border-zinc-200 bg-white p-2 shadow-[0_18px_42px_rgba(20,63,56,0.16)] lg:hidden"
          aria-label="Navigasi seluler"
        >
          {publicNavigation.map((item) => {
            const active = isPublicNavigationActive(pathname, item);
            return (
              <Link
                key={item.href}
                href={scenarioHref(item.href, scenario.id)}
                aria-current={active ? 'page' : undefined}
                className={`interactive flex min-h-11 items-center justify-between rounded-xl px-3.5 text-sm ${active ? 'bg-emerald-50 font-semibold text-emerald-800' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950'}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
                <ArrowUpRight className="size-4" />
              </Link>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}
