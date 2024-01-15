import './partners.scss';
import { getPartnerData } from '@/db/schema';
import PartnerCard from '@/components/PartnerCard/PartnerCard';

const Partner = async () => {
  const data = await getPartnerData();
  return (
    <>
      <PartnerCard data={data} />
    </>
  );
};

export default Partner;
