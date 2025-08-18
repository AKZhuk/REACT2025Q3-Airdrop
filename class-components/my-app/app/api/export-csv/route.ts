import { NextRequest } from 'next/server';

type CsvItem = {
  name: string;
  url: string;
};

function escapeCSV(value: unknown): string {
  let s = String(value ?? '');
  if (/[",\n\r]/.test(s)) s = `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function POST(req: NextRequest) {
  let items: CsvItem[] = [];
  try {
    items = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return new Response('No items to export', { status: 400 });
  }

  const header = ['Name', 'URL'];
  const rows = [header, ...items.map(i => [i.name, i.url])];
  const csv = rows.map(r => r.map(escapeCSV).join(',')).join('\r\n');

  const filename = `${items.length}_items.csv`;

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
