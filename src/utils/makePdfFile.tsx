import Invoice from '@/components/Invoice/Invoice';
import { Partner } from '@/db/schema';
import { pdf } from '@react-pdf/renderer';
import { EntryType } from './rows';
import { checkPartner } from './verify';

export async function makePdfFile(
  partnerData: EntryType[] | undefined,
  partnerDataFromDB: Partner | undefined
) {
  const hasValidDBData = checkPartner(partnerDataFromDB);

  if (!hasValidDBData) return null;

  const i = (
    <Invoice
      data={partnerData}
      companyData={partnerDataFromDB}
    ></Invoice>
  );

  const filename = `${
    partnerDataFromDB?.name || partnerData?.[0].Partenaire || 'default partner'
  }_${new Date().toISOString()}.pdf`;

  const z = await pdf(i).toBlob();
  return {
    blob: z,
    filename,
    id: partnerDataFromDB ? partnerDataFromDB.id : filename,
  };
}
