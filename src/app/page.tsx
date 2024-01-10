import PDFGenerator from '@/components/PDFGenerator/PDFGenerator';
import './home.scss';
// import fetchPartnerData from '@/utils/fetchPartnerData';
import fetchTripData from '@/utils/fetchTripData';
import { getPartnerData } from '../db/schema';
import { Metadata } from 'next';
import Link from 'next/link';

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
        <h1>Bienvenue !</h1>
        <h3>
          Si vous etes un admin - veuillez aller{' '}
          <Link
            href="/admin/invoices"
            prefetch={false}
          >
            ici
          </Link>
        </h3>
      </div>
    </>
  );
};

export default Home;
