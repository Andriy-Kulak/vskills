import { getEntry } from '@/lib/data';

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Props) {
  const { id } = await params;
  const entry = getEntry(id);

  if (!entry) {
    return Response.json(
      { error: 'Entry not found', id },
      { status: 404, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }

  return Response.json(entry, {
    headers: {
      'Cache-Control': 'public, max-age=60',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
