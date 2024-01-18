import { Partner } from '@/db/schema';

// функція повертає фолс якщо немає партнера або одного з його полів
// і повертає тру якщо все є
export function checkPartner(partnerData?: Partner): boolean {
  if (!partnerData) {
    return false;
  }

  if (
    !partnerData.id ||
    !partnerData.name ||
    !partnerData.address ||
    !partnerData.siret ||
    !partnerData.type
  ) {
    return false;
  }

  return true;
}
