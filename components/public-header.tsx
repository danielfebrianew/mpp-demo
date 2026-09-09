'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Clock3, Landmark } from 'lucide-react';
import { getScenarioData, scenarioHref } from '@/lib/mpp-data';
import { cn } from '@/lib/utils';

const navigation = [
  { href: '/', label: 'Beranda' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/kiosk', label: 'Antrean' },
  { href: '/supervisor', label: 'Statistik' },
] as const;

export function PublicHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scenario = getScenarioData(searchParams.get('scenario'));
  const statusClass = scenario.system.tone === 'danger'
    ? 'bg-red-50 text-red-700'
    : scenario.system.tone === 'warning'
      ? 'bg-amber-50 text-amber-700'
      : scenario.system.tone === 'priority'
        ? 'bg-orange-50 text-orange-700'
        : 'bg-emerald-50 text-emerald-700';

  return (
    <header className="border-b border-zinc-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-18 max-w-350 items-center justify-between gap-5">
        <Link href={scenarioHref('/', scenario.id)} className="interactive flex min-w-0 items-center gap-3 rounded-xl focus-visible:ring-2 focus-visible:ring-zinc-400" aria-label="Beranda MPP Arunika">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-zinc-950 text-white shadow-sm"><Landmark className="size-4.75" strokeWidth={1.8} /></span>
          <span className="min-w-0"><span className="block truncate text-sm font-semibold tracking-[-0.01em]">MPP Kabupaten Arunika</span><span className="block text-xs text-zinc-500">Portal pelayanan warga</span></span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-xl bg-zinc-100 p-1 lg:flex" aria-label="Navigasi utama">
          {navigation.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={scenarioHref(item.href, scenario.id)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'interactive rounded-lg px-4 py-2 text-sm text-zinc-500 hover:bg-white hover:text-zinc-950',
                  active && 'bg-white font-medium text-zinc-950 shadow-sm',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <span className={`hidden max-w-52 items-center gap-2 truncate rounded-xl px-3 py-2 text-xs font-medium sm:flex ${statusClass}`} title={scenario.system.detail}><Clock3 className="size-3.5 shrink-0" /> <span className="truncate">{scenario.system.label}</span></span>
          <Link href={scenarioHref('/ticket/A-023', scenario.id)} className="interactive inline-flex h-10 items-center rounded-xl bg-zinc-950 px-3 text-xs font-semibold text-white hover:bg-zinc-800 sm:px-4 sm:text-sm">Cek antrean</Link>
        </div>
      </div>
    </header>
  );
}
