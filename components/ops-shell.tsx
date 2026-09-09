'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { BarChart3, Bell, CircleGauge, Landmark, Search, Settings2, UserRoundCog } from 'lucide-react';
import { getScenarioCopy } from '@/lib/mpp-data';
import { cn } from '@/lib/utils';

const opsNav = [
  { href: '/operator', label: 'Operator', icon: UserRoundCog },
  { href: '/supervisor', label: 'Supervisor', icon: CircleGauge },
  { href: '/admin', label: 'Konfigurasi', icon: Settings2 },
  { href: '/display', label: 'Display publik', icon: BarChart3 },
];

export function OpsShell({ title, eyebrow, children }: { title: string; eyebrow: string; children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scenarioId = searchParams.get('scenario') ?? 'normal';
  const scenario = getScenarioCopy(scenarioId);

  return (
    <div className="min-h-screen bg-[#e9ece7] text-[#102a2d]">
      <header className="border-b border-[#42585a] bg-[#102a2d] text-white">
        <div className="mx-auto flex h-17 max-w-375 items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="interactive flex shrink-0 items-center gap-3">
            <span className="grid size-9 place-items-center bg-[#1848c7]"><Landmark className="size-4.5" strokeWidth={1.7} /></span>
            <span className="hidden sm:block"><span className="block text-[10px] tracking-[0.12em] text-[#9eaaa7]">MPP ARUNIKA</span><span className="block text-sm">Ruang operasional</span></span>
          </Link>

          <nav className="flex h-full min-w-0 items-center gap-1 overflow-x-auto" aria-label="Navigasi operasional">
            {opsNav.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={`${item.href}?scenario=${scenarioId}`}
                  className={cn(
                    'interactive relative flex h-full shrink-0 items-center gap-2 px-3 text-xs text-[#aebbb5] hover:text-white sm:px-4 sm:text-sm',
                    active && 'text-white after:absolute after:inset-x-3 after:bottom-0 after:h-0.75 after:bg-[#6f91f8]',
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.7} /> <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <span className="hidden shrink-0 border border-white/15 px-3 py-2 text-[11px] text-[#c5cfca] xl:block">Snapshot demo</span>
        </div>
      </header>

      <main id="main-content" className="min-w-0">
        <div className="border-b border-[#ced6d1] bg-[#f9faf7]">
          <div className="mx-auto flex max-w-375 items-center justify-between gap-5 px-4 py-6 sm:px-6 lg:px-8">
            <div>
              <p className="text-xs text-[#1848c7]">{eyebrow}</p>
              <h1 className="mt-1 text-3xl leading-none tracking-[-0.04em] sm:text-4xl">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden border-l-2 border-[#1848c7] bg-[#e2e7e3] px-3 py-2 text-xs text-[#526568] sm:block">{scenario}</span>
              <button type="button" aria-label="Cari" className="interactive grid size-10 place-items-center border border-[#b9c4be] bg-transparent text-[#526568] hover:bg-[#e5e9e4]"><Search className="size-4" /></button>
              <button type="button" aria-label="Notifikasi" className="interactive relative grid size-10 place-items-center border border-[#b9c4be] bg-transparent text-[#526568] hover:bg-[#e5e9e4]"><Bell className="size-4" /><span className="absolute right-2 top-2 size-1.5 bg-[#1848c7]" /></button>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-375 p-4 pb-28 sm:p-6 sm:pb-32 lg:p-8 lg:pb-32">{children}</div>
      </main>
    </div>
  );
}

export function StatCard({ label, value, note, tone = 'teal' }: { label: string; value: string; note: string; tone?: 'teal' | 'navy' | 'amber' }) {
  const semantic = tone === 'amber' ? 'text-[#9a5d13]' : tone === 'navy' ? 'text-[#41575a]' : 'text-[#1848c7]';
  return (
    <div className="border-t-2 border-[#102a2d] bg-[#f9faf7] px-5 py-5">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm text-[#607073]">{label}</p>
        <span className={cn('size-2', tone === 'amber' ? 'bg-[#c98122]' : 'bg-[#1848c7]')} />
      </div>
      <p className="tabular mt-5 text-4xl tracking-[-0.06em]">{value}</p>
      <p className={cn('mt-2 text-xs', semantic)}>{note}</p>
    </div>
  );
}
