import PDFGenerator from '@/components/PDFGenerator/PDFGenerator';
import './invoices.scss';
// import fetchPartnerData from '@/utils/fetchPartnerData';
import fetchTripData from '@/utils/fetchTripData';
import { getPartnerData } from '@/db/schema';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hopways Facture',
};
export const revalidate = 0;

const Home = async () => {
  // const partnerData = await fetchPartnerData();
  const trips = await fetchTripData();
  const data = await getPartnerData();

  return (
    <>
      <div className="wrapper">
        <PDFGenerator
          data={data}
          trips={trips}
        />
      </div>
    </>
  );
};

export default Home;
