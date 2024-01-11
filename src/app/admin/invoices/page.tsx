import PDFGenerator from '@/components/PDFGenerator/PDFGenerator';
import './invoices.scss';

import { getPartnerData } from '@/db/schema';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hopways Facture',
};
export const revalidate = 0;

const Home = async () => {
  const data = await getPartnerData();

  return (
    <>
      <div className="wrapper">
        <PDFGenerator data={data} />
      </div>
    </>
  );
};

export default Home;
