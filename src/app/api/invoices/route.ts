import { db } from '@/db/app';
import { invoices } from '@/db/schema';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function POST(request: NextRequest) {
  try {
    const file = await request.blob();
    if ((await file.text()).length === 0) {
      return new Response('No file', { status: 400 });
    }
    const params = request.nextUrl.searchParams;
    const partnerId = params.get('partner');
    if (!partnerId) {
      return new Response('No partnerId', { status: 400 });
    }
    await db.insert(invoices).values({
      data: await file.text(),
      partnerId: parseInt(partnerId),
    });
    return new Response();
  } catch (error) {
    return new Response('Some error', { status: 500 });
  }
}
