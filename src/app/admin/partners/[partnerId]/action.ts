'use server';
import { updatePartnerById, deletePartnerById } from '@/db/schema';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const handleUpdate = async (id: number, formData: FormData) => {
  const data = Object.fromEntries(formData);
  if (
    typeof data.address !== 'string' ||
    typeof data.name !== 'string' ||
    typeof data.siret !== 'string' ||
    typeof data.type !== 'string'
  )
    return;

  await updatePartnerById({
    id: +id,
    name: data.name,
    address: data.address,
    type: data.type,
    siret: data.siret,
  });

  revalidatePath('/admin/partners/' + id);
  redirect('/admin/partners/' + id);
};

export const deletePartner = async (id: number) => {
  await deletePartnerById(id);
  revalidatePath('/admin/partners/');
  redirect('/admin/partners/');
};

export default handleUpdate;
