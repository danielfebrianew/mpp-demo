export const publicNavigation = [
  { href: '/', label: 'Beranda', match: 'exact' },
  { href: '/layanan', label: 'Layanan', match: 'prefix' },
  { href: '/panduan-kunjungan', label: 'Panduan kunjungan', match: 'exact' },
  { href: '/lokasi-jam', label: 'Lokasi & jam', match: 'exact' },
] as const;

export function isPublicNavigationActive(
  pathname: string,
  item: (typeof publicNavigation)[number],
) {
  return item.match === 'prefix'
    ? pathname === item.href || pathname.startsWith(`${item.href}/`)
    : pathname === item.href;
}
