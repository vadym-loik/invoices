import { db } from '@/db/app';
import { invoices } from '@/db/schema';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files');
    const array: { partnerId: number; data: string }[] = (
      await Promise.all(
        files.map(async (f) => {
          if (!(f instanceof File)) {
            return;
          }
          if (f.name.includes('.pdf')) return;
          return {
            partnerId: parseInt(f.name),
            data: await f.text(),
          };
        })
      )
    ).reduce(
      (a, c) => {
        if (!c) return a;
        a.push(c);
        return a;
      },
      [] as { partnerId: number; data: string }[]
    );

    await db.insert(invoices).values([...array]);

    return new Response();
  } catch (error) {
    console.log(error);

    return new Response('Some error', { status: 500 });
  }
}
