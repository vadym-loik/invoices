import './partners.scss';
import { getPartnerData } from '@/db/schema';
import PartnerCard from '@/components/PartnerCard/PartnerCard';
import Link from 'next/link';

export const revalidate = 0;

const Partner = async () => {
  const data = await getPartnerData();
  return (
    <>
      <Link
        href={'/admin/partners/add'}
        prefetch={false}
      >
        Ajouter un Partenaire
      </Link>
      <PartnerCard data={data} />
    </>
  );
};

export default Partner;
