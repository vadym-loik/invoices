'use server';
import { addPartner } from '@/db/schema';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default async function addPartnerAction(formData: FormData) {
  const data = Object.fromEntries(formData);
  if (
    typeof data.address !== 'string' ||
    typeof data.name !== 'string' ||
    typeof data.siret !== 'string' ||
    typeof data.type !== 'string'
  )
    return;

  await addPartner({
    name: data.name,
    address: data.address,
    siret: data.siret,
    type: data.type,
  });
  revalidatePath('/admin/partners');
  redirect('/admin/partners/add?success=true');
}
