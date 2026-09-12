type SearchableService = {
  slug: string;
  name: string;
  agency: string;
};

export const serviceSearchAliases: Readonly<Record<string, string>> = {
  'perekaman-ktp': 'ktp el identitas penduduk',
  'perubahan-kartu-keluarga': 'kk keluarga penduduk',
  'konsultasi-nib': 'izin usaha bisnis oss',
  'izin-praktik-tenaga-kesehatan': 'sipp kesehatan dokter perawat',
  'pajak-bumi-bangunan': 'pbb pajak rumah tanah',
  'kepesertaan-bpjs': 'bpjs jaminan kesehatan kis',
};

export function matchesServiceQuery(service: SearchableService, query: string) {
  const tokens = query
    .trim()
    .toLocaleLowerCase('id')
    .split(/\s+/)
    .filter(Boolean);

  if (!tokens.length) return true;

  const searchableText =
    `${service.name} ${service.agency} ${serviceSearchAliases[service.slug] ?? ''}`.toLocaleLowerCase(
      'id',
    );

  return tokens.every((token) => searchableText.includes(token));
}
