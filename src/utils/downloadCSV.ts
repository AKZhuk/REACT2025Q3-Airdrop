import type { PokemonItem } from '@/types';

export async function downloadCSV(items: PokemonItem[]) {
  const res = await fetch('/api/export-csv', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items),
  });

  if (!res.ok) {
    throw new Error(`CSV export failed: ${res.status}`);
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${items.length}_items.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}
