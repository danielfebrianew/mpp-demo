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
import {
  Expandable,
  ExpandableCard,
  ExpandableContent,
  ExpandableTrigger,
} from '@/components/ui/expandable';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  getScenarioData,
  parseScenario,
  scenarioHref,
  scenarios,
} from '@/lib/mpp-data';
import { cn } from '@/lib/utils';
import styles from './demo-navigator.module.css';

type DemoMode = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  note: string;
  matches: (pathname: string) => boolean;
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
      {
        id: 'portal',
        label: 'Portal Warga',
        href: '/',
        icon: PanelTop,
        note: 'Informasi layanan untuk publik',
        matches: (pathname: string) => pathname === '/' || pathname.startsWith('/layanan'),
      },
    ],
  },
  {
    id: 'office-device',
    label: 'Device kantor',
    note: 'Admin dan operasional',
    modes: [
      {
        id: 'operator',
        label: 'Operator Loket',
        href: '/operator',
        icon: UserRoundCog,
        note: 'Kelola meja pelayanan',
        matches: (pathname: string) => pathname.startsWith('/operator'),
      },
      {
        id: 'display',
        label: 'Display TV',
        href: '/display',
        icon: Monitor,
        note: 'Layar panggilan ruang tunggu',
        matches: (pathname: string) => pathname.startsWith('/display'),
      },
      {
        id: 'supervisor',
        label: 'Supervisor',
        href: '/supervisor',
        icon: CircleGauge,
        note: 'Pantau seluruh zona',
        matches: (pathname: string) => pathname.startsWith('/supervisor'),
      },
      {
        id: 'admin',
        label: 'Admin',
        href: '/admin',
        icon: LayoutDashboard,
        note: 'Atur layanan dan loket',
        matches: (pathname: string) => pathname.startsWith('/admin'),
      },
    ],
  },
  {
    id: 'qr-scan',
    label: 'Scan QR',
    note: 'Dibuka di HP masing-masing warga',
    modes: [
      {
        id: 'ticket',
        label: 'Tiket Warga',
        href: '/ticket/A-023',
        icon: Ticket,
        note: 'Lacak antrean dari HP',
        matches: (pathname: string) => pathname.startsWith('/ticket'),
      },
    ],
  },
  {
    id: 'kiosk-device',
    label: 'Kiosk',
    note: 'Perangkat depan untuk cetak tiket',
    modes: [
      {
        id: 'kiosk',
        label: 'Ambil Tiket',
        href: '/kiosk',
        icon: ScanLine,
        note: 'Ambil dan cetak nomor antrean',
        matches: (pathname: string) => pathname.startsWith('/kiosk'),
      },
    ],
  },
] as const satisfies readonly ModeGroup[];

const modes = modeGroups.flatMap<DemoMode>((group) => group.modes);

function resolveActiveMode(pathname: string) {
  return modes.find((mode) => mode.matches(pathname)) ?? modes[0];
}

export function DemoNavigator({ activePath }: { activePath?: string }) {
  const [expanded, setExpanded] = React.useState(false);
  const detectedPathname = usePathname();
  const pathname = activePath ?? detectedPathname;
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeMode = resolveActiveMode(pathname);
  const currentScenario = parseScenario(searchParams.get('scenario'));
  const scenarioData = getScenarioData(currentScenario);
  const activeIndex = modes.findIndex((mode) => mode.id === activeMode.id);
  const activeGroup =
    modeGroups.find((group) =>
      group.modes.some((mode) => mode.id === activeMode.id),
    ) ?? modeGroups[0];
  const ActiveIcon = activeMode.icon;

  React.useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpanded(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  function changeScenario(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('scenario', value);
    router.push(`${detectedPathname}?${params.toString()}`);
  }

  return (
    <div className={cn(styles.root, 'fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6')}>
      <Expandable expanded={expanded} onToggle={() => setExpanded((value) => !value)}>
        <ExpandableCard
          className={cn(
            styles.panel,
            'overflow-hidden rounded-[1.35rem] border text-[#143f38] ring-1 backdrop-blur-xl',
            expanded ? 'w-[min(430px,calc(100vw-2rem))]' : 'w-16',
          )}
        >
          <ExpandableTrigger
            aria-label={expanded ? 'Tutup navigasi demo' : 'Buka navigasi demo'}
            className={cn(
              styles.trigger,
              'group flex items-center px-3 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset',
              expanded && 'gap-3',
            )}
          >
            <span className={cn(styles.modeIcon, 'relative grid size-10 shrink-0 place-items-center rounded-xl text-white')}>
              <ActiveIcon className="size-4.5" strokeWidth={1.8} />
              {!expanded ? <span className={cn(styles.indicator, 'absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-white')} /> : null}
            </span>
            <span className={cn('min-w-0 flex-1', !expanded && 'hidden')}>
              <span className="flex items-center gap-1.5 text-xs font-medium text-[#65706d]">
                <span className={cn(styles.indicator, 'size-2 rounded-full')} /> {activeGroup.label} · {activeIndex + 1} dari {modes.length}
              </span>
              <span className="mt-0.5 block truncate text-sm font-semibold text-[#143f38]">{activeMode.label}</span>
            </span>
            <span className={cn(styles.chevron, 'size-8 place-items-center rounded-lg border', expanded ? 'grid' : 'hidden')}>
              <ChevronDown className={cn('size-4 transition-transform', expanded && 'rotate-180')} />
            </span>
          </ExpandableTrigger>

          <ExpandableContent className={cn(styles.content, 'max-h-[calc(100dvh-6rem)] overflow-y-auto border-t px-3 pb-3 pt-3.5')}>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#143f38]">Pilih perangkat</p>
                <p className="mt-0.5 text-xs text-[#65706d]">Tampilan dikelompokkan sesuai penggunaan</p>
              </div>
              <Badge variant="outline" className={styles.demoBadge}>Demo</Badge>
            </div>

            <nav aria-label="Pilih perangkat demo" className="space-y-2">
              {modeGroups.map((group) => (
                <section key={group.id} aria-labelledby={`device-group-${group.id}`} className={cn(styles.group, 'rounded-2xl p-2')}>
                  <header className="flex items-start justify-between gap-3 px-1.5 pb-2 pt-1">
                    <div className="min-w-0">
                      <h3 id={`device-group-${group.id}`} className="text-xs font-semibold text-[#35413e]">{group.label}</h3>
                      <p className="mt-0.5 truncate text-[11px] text-[#65706d]">{group.note}</p>
                    </div>
                    <span className="tabular shrink-0 text-[10px] text-[#8a9894]">{group.modes.length} tampilan</span>
                  </header>

                  <div className={cn('grid gap-1', group.modes.length > 1 && 'sm:grid-cols-2')}>
                    {group.modes.map((mode) => {
                      const Icon = mode.icon;
                      const isActive = mode.id === activeMode.id;
                      return (
                        <Link
                          key={mode.id}
                          aria-current={isActive ? 'page' : undefined}
                          href={scenarioHref(mode.href, currentScenario)}
                          className={cn(styles.modeLink, 'interactive group flex min-h-14 items-center gap-3 rounded-xl border px-2.5 py-2 outline-none', isActive && styles.activeMode)}
                        >
                          <span className={cn(styles.itemIcon, 'grid size-8 shrink-0 place-items-center rounded-lg border', isActive && styles.activeItemIcon)}>
                            <Icon className="size-4" strokeWidth={1.8} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-medium">{mode.label}</span>
                            <span className={cn(styles.modeNote, 'block text-[11px] text-[#65706d]')}>{mode.note}</span>
                          </span>
                          {isActive ? <Check className="size-4 text-[#28665d]" strokeWidth={2} /> : null}
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ))}
            </nav>

            <div className={cn(styles.scenario, 'mt-3 border-t pt-3')}>
              <label htmlFor="demo-scenario" className="mb-2 block text-xs font-medium text-[#4f5a57]">Skenario data</label>
              <Select value={currentScenario} onValueChange={(value) => changeScenario(String(value))}>
                <SelectTrigger id="demo-scenario" className={cn(styles.selectTrigger, 'h-10 w-full rounded-xl px-3 shadow-xs')}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end" className={cn(styles.selectContent, 'rounded-xl')}>
                  {scenarios.map((scenario) => (
                    <SelectItem key={scenario.id} value={scenario.id} className={styles.selectItem}>
                      {scenario.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className={cn(styles.snapshot, 'mt-2 rounded-xl px-3 py-2.5')}>
                <p className="text-[11px] font-medium leading-4 text-[#35413e]">{scenarioData.description}</p>
                <p className="tabular mt-1 text-[10px] text-[#8a9894]">Snapshot {scenarioData.updatedAt}</p>
              </div>
            </div>
          </ExpandableContent>
        </ExpandableCard>
      </Expandable>
    </div>
  );
}
