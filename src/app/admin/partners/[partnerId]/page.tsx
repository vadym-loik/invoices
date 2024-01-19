import { getPartnerById } from '@/db/schema';
import './partnerId.scss';
import React from 'react';
import EditPartnerForm from './EditPartnerForm';
import Link from 'next/link';
import DeletePartner from './DeletePartner';

const PartnerPage: React.FC<{
  params: { partnerId: number };
  searchParams: { editing?: string };
}> = async ({ params, searchParams }) => {
  const partner = await getPartnerById(params.partnerId);

  if (!partner) {
    return <div>Partenaire non trouvé</div>;
  }

  return (
    <div className="partner-view">
      <h1 className="partner-heading">{partner.name}</h1>
      <div className="partner-info">
        <p>{partner.address}</p>
        <p>{partner.type}</p>
        <p>{partner.siret}</p>
      </div>
      {searchParams.editing ? (
        <EditPartnerForm partner={partner} />
      ) : (
        <Link
          className="partner-link"
          href={`/admin/partners/${params.partnerId}?editing=true`}
          prefetch={false}
        >
          Éditer partenaire
        </Link>
      )}
      <DeletePartner id={params.partnerId} />
    </div>
  );
};

export default PartnerPage;
