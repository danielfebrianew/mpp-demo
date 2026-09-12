import type { Scenario } from '@/lib/mpp-data';

export type AvailabilityStatus = 'available' | 'limited' | 'full' | 'closed';

export type MockOutlet = {
  id: string;
  name: string;
  address: string;
  note: string;
  agencyIds: readonly string[];
};

export type MockAvailability = {
  date: string;
  status: AvailabilityStatus;
  remaining: number;
};

export const mockOutlets: readonly MockOutlet[] = [
  {
    id: 'mpp-pusat',
    name: 'MPP Kabupaten Wakanda',
    address: 'Jl. Dr. Sutomo No. 5, Sragen',
    note: 'Gedung utama - seluruh layanan tersedia',
    agencyIds: ['disdukcapil', 'dpmptsp', 'bapenda', 'dinkes', 'bpjs'],
  },
  {
    id: 'gerai-utara',
    name: 'Gerai Pelayanan Utara',
    address: 'Jl. Raya Sukowati No. 18, Sragen',
    note: 'Layanan kependudukan dan BPJS',
    agencyIds: ['disdukcapil', 'bpjs'],
  },
  {
    id: 'gerai-selatan',
    name: 'Gerai Pelayanan Selatan',
    address: 'Jl. Veteran No. 7, Sragen',
    note: 'Layanan perizinan dan pajak daerah',
    agencyIds: ['dpmptsp', 'bapenda'],
  },
] as const;

const baseAvailability: readonly MockAvailability[] = [
  { date: '2026-09-14', status: 'available', remaining: 18 },
  { date: '2026-09-15', status: 'limited', remaining: 4 },
  { date: '2026-09-16', status: 'full', remaining: 0 },
  { date: '2026-09-17', status: 'available', remaining: 12 },
  { date: '2026-09-18', status: 'closed', remaining: 0 },
  { date: '2026-09-21', status: 'available', remaining: 16 },
  { date: '2026-09-22', status: 'limited', remaining: 3 },
  { date: '2026-09-23', status: 'available', remaining: 11 },
  { date: '2026-09-24', status: 'available', remaining: 14 },
  { date: '2026-09-25', status: 'closed', remaining: 0 },
] as const;

export function getCompatibleOutlets(agencyId: string) {
  return mockOutlets.filter((outlet) => outlet.agencyIds.includes(agencyId));
}

export function getMockAvailability(
  outletId: string,
  serviceSlug: string,
  scenario: Scenario,
): MockAvailability[] {
  if (scenario === 'disruption' && serviceSlug === 'perekaman-ktp') return [];

  const outletAdjustment = outletId === 'mpp-pusat' ? 0 : -2;
  return baseAvailability.map((item, index) => {
    if (scenario === 'busy' && item.status === 'available' && index < 6) {
      return {
        ...item,
        status: 'limited',
        remaining: Math.max(1, item.remaining - 13),
      };
    }
    if (scenario === 'busy' && item.status === 'limited') {
      return { ...item, status: 'full', remaining: 0 };
    }
    return {
      ...item,
      remaining:
        item.status === 'available' || item.status === 'limited'
          ? Math.max(1, item.remaining + outletAdjustment)
          : 0,
    };
  });
}

export function normalizeWhatsApp(value: string) {
  const compact = value.replace(/[\s()-]/g, '');
  if (compact.startsWith('+62')) return `62${compact.slice(3)}`;
  if (compact.startsWith('08')) return `62${compact.slice(1)}`;
  return compact;
}

export function isValidWhatsApp(value: string) {
  const normalized = normalizeWhatsApp(value);
  return (
    /^628\d{7,12}$/.test(normalized) &&
    normalized.length >= 9 &&
    normalized.length <= 15
  );
}
