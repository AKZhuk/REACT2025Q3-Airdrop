import { NextResponse } from 'next/server';

type SelectedItem = {
  name: string;
  url: string;
};

export async function POST(request: Request) {
  const items = (await request.json()) as SelectedItem[];

  const header = ['Name', 'URL'];
  const rows = items.map(i => [i.name, i.url]);

  const escape = (val: string) =>
    `"${String(val).replace(/"/g, '""')}"`;

  const csv = [header, ...rows].map(r => r.map(escape).join(',')).join('\n');

  const filename = `${items.length}_items.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
