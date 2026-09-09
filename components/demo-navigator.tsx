'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Check,
  ChevronDown,
  CircleGauge,
  LayoutDashboard,
  Monitor,
  PanelTop,
  ScanLine,
  Ticket,
  UserRoundCog,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Expandable, ExpandableCard, ExpandableContent, ExpandableTrigger } from '@/components/ui/expandable';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getScenarioData, parseScenario, scenarios } from '@/lib/mpp-data';
import { cn } from '@/lib/utils';

type DemoMode = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  note: string;
};

type ModeGroup = {
  id: string;
  label: string;
  note: string;
  modes: readonly DemoMode[];
};

const modeGroups = [
  {
    id: 'web-general',
    label: 'Web general',
    note: 'Bisa diakses siapa saja',
    modes: [
      { id: 'portal', label: 'Portal Warga', href: '/', icon: PanelTop, note: 'Informasi layanan untuk publik' },
    ],
  },
  {
    id: 'office-device',
    label: 'Device kantor',
    note: 'Admin dan operasional',
    modes: [
      { id: 'operator', label: 'Operator Loket', href: '/operator', icon: UserRoundCog, note: 'Kelola meja pelayanan' },
      { id: 'display', label: 'Display TV', href: '/display', icon: Monitor, note: 'Layar panggilan ruang tunggu' },
      { id: 'supervisor', label: 'Supervisor', href: '/supervisor', icon: CircleGauge, note: 'Pantau seluruh zona' },
      { id: 'admin', label: 'Admin', href: '/admin', icon: LayoutDashboard, note: 'Atur layanan dan loket' },
    ],
  },
  {
    id: 'qr-scan',
    label: 'Scan QR',
    note: 'Dibuka di HP masing-masing warga',
    modes: [
      { id: 'ticket', label: 'Tiket Warga', href: '/ticket/A-023', icon: Ticket, note: 'Lacak antrean dari HP' },
    ],
  },
  {
    id: 'kiosk-device',
    label: 'Kiosk',
    note: 'Perangkat depan untuk cetak tiket',
    modes: [
      { id: 'kiosk', label: 'Ambil Tiket', href: '/kiosk', icon: ScanLine, note: 'Ambil dan cetak nomor antrean' },
    ],
  },
] as const satisfies readonly ModeGroup[];

const modes = modeGroups.flatMap<DemoMode>((group) => group.modes);

function getActiveMode(pathname: string) {
  if (pathname === '/') return modes[0];
  return modes.find((mode) => mode.href !== '/' && pathname.startsWith(mode.href)) ?? modes[0];
}

export function DemoNavigator() {
  const [expanded, setExpanded] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeMode = getActiveMode(pathname);
  const currentScenario = parseScenario(searchParams.get('scenario'));
  const scenarioData = getScenarioData(currentScenario);
  const activeIndex = modes.findIndex((mode) => mode.id === activeMode.id);
  const activeGroup = modeGroups.find((group) => group.modes.some((mode) => mode.id === activeMode.id)) ?? modeGroups[0];
  const ActiveIcon = activeMode.icon;

  React.useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  function hrefWithScenario(href: string) {
    const separator = href.includes('?') ? '&' : '?';
    return `${href}${separator}scenario=${currentScenario}`;
  }

  function changeScenario(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('scenario', value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <Expandable expanded={expanded} onToggle={() => setExpanded((value) => !value)}>
        <ExpandableCard
          className={cn(
            'overflow-hidden rounded-[1.35rem] border border-white/80 bg-white/95 text-zinc-950 ring-1 ring-zinc-950/10 shadow-[0_24px_70px_rgba(24,24,27,0.20)] backdrop-blur-xl',
            expanded ? 'w-[min(430px,calc(100vw-2rem))]' : 'w-16',
          )}
        >
          <ExpandableTrigger
            aria-label={expanded ? 'Tutup navigasi demo' : 'Buka navigasi demo'}
            className={cn(
              'group flex items-center px-3 py-3 transition-colors hover:bg-zinc-50/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-400',
              expanded && 'gap-3',
            )}
          >
            <span className="relative grid size-10 shrink-0 place-items-center rounded-xl bg-zinc-950 text-white shadow-sm">
              <ActiveIcon className="size-4.5" strokeWidth={1.8} />
              {!expanded ? <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-white bg-orange-500" /> : null}
            </span>
            <span className={cn('min-w-0 flex-1', !expanded && 'hidden')}>
              <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                <span className="size-2 rounded-full bg-orange-500" /> {activeGroup.label} · {activeIndex + 1} dari {modes.length}
              </span>
              <span className="mt-0.5 block truncate text-sm font-semibold text-zinc-950">{activeMode.label}</span>
            </span>
            <span className={cn('size-8 place-items-center rounded-lg border border-zinc-200 bg-white text-zinc-500 shadow-xs', expanded ? 'grid' : 'hidden')}>
              <ChevronDown className={cn('size-4 transition-transform', expanded && 'rotate-180')} />
            </span>
          </ExpandableTrigger>

          <ExpandableContent className="max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-zinc-200 px-3 pb-3 pt-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-zinc-950">Pilih perangkat</p>
                <p className="mt-0.5 text-xs text-zinc-500">Tampilan dikelompokkan sesuai penggunaan</p>
              </div>
              <Badge variant="outline" className="border-zinc-200 bg-white text-zinc-600">Demo</Badge>
            </div>

            <nav aria-label="Pilih perangkat demo" className="space-y-2">
              {modeGroups.map((group) => (
                <section key={group.id} aria-labelledby={`device-group-${group.id}`} className="rounded-2xl bg-zinc-50 p-2">
                  <header className="flex items-start justify-between gap-3 px-1.5 pb-2 pt-1">
                    <div className="min-w-0">
                      <h3 id={`device-group-${group.id}`} className="text-xs font-semibold text-zinc-800">{group.label}</h3>
                      <p className="mt-0.5 truncate text-[11px] text-zinc-500">{group.note}</p>
                    </div>
                    <span className="tabular shrink-0 text-[10px] text-zinc-400">{group.modes.length} tampilan</span>
                  </header>

                  <div className={cn('grid gap-1', group.modes.length > 1 && 'sm:grid-cols-2')}>
                    {group.modes.map((mode) => {
                      const Icon = mode.icon;
                      const isActive = mode.id === activeMode.id;
                      return (
                        <Link
                          key={mode.id}
                          href={hrefWithScenario(mode.href)}
                          className={cn(
                            'interactive group flex items-center gap-3 rounded-xl px-2.5 py-2 text-zinc-600 outline-none hover:bg-white hover:text-zinc-950 focus-visible:ring-2 focus-visible:ring-zinc-400',
                            isActive && 'bg-white text-zinc-950 shadow-sm ring-1 ring-zinc-200',
                          )}
                        >
                          <span className={cn('grid size-8 shrink-0 place-items-center rounded-lg border', isActive ? 'border-zinc-950 bg-zinc-950 text-white' : 'border-zinc-200 bg-white text-zinc-500')}>
                            <Icon className="size-4" strokeWidth={1.8} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-medium">{mode.label}</span>
                            <span className="block truncate text-[11px] text-zinc-500">{mode.note}</span>
                          </span>
                          {isActive ? <Check className="size-4 text-zinc-950" strokeWidth={2} /> : null}
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ))}
            </nav>

            <div className="mt-3 border-t border-zinc-200 pt-3">
              <label htmlFor="demo-scenario" className="mb-2 block text-xs font-medium text-zinc-600">
                Skenario data
              </label>
              <Select value={currentScenario} onValueChange={(value) => changeScenario(String(value))}>
                <SelectTrigger id="demo-scenario" className="h-10 w-full rounded-xl border-zinc-200 bg-white px-3 text-zinc-950 shadow-xs focus-visible:border-zinc-400 focus-visible:ring-zinc-300/40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end" className="rounded-xl bg-white text-zinc-950 ring-zinc-950/10">
                  {scenarios.map((scenario) => (
                    <SelectItem key={scenario.id} value={scenario.id} className="text-zinc-700 focus:bg-zinc-100 focus:text-zinc-950">
                      {scenario.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-2 rounded-xl bg-zinc-50 px-3 py-2.5">
                <p className="text-[11px] font-medium leading-4 text-zinc-700">{scenarioData.description}</p>
                <p className="tabular mt-1 text-[10px] text-zinc-400">Snapshot {scenarioData.updatedAt}</p>
              </div>
            </div>
          </ExpandableContent>
        </ExpandableCard>
      </Expandable>
    </div>
  );
}
