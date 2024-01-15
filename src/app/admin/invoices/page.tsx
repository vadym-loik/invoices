import PDFGenerator from '@/components/PDFGenerator/PDFGenerator';
import './invoices.scss';

import { getPartnerData } from '@/db/schema';
import { Metadata } from 'next';
import { auth, currentUser } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Hopways Facture',
};
export const revalidate = 0;

const Home = async () => {
  const data = await getPartnerData();
  const user = await currentUser();
  const { userId } = auth();

  const isNotAdmin =
    !user ||
    !user.privateMetadata ||
    !('role' in user.privateMetadata) ||
    ('role' in user.privateMetadata &&
      typeof user.privateMetadata.role === 'string' &&
      !user.privateMetadata.role.includes('admin'));

  if (!userId || isNotAdmin) {
    // redirect('/');
    return <div>{"Désolé, vous n'avez pas accès."}</div>;
  }

  return (
    <>
      <div className="wrapper">
        <PDFGenerator data={data} />
      </div>
    </>
  );
};

export default Home;
