import { Partner } from '@/db/schema';
import './partnerCard.scss';
import Link from 'next/link';

const PartnerCard = ({ data }: { data: Partner[] }) => {
  return (
    <div className="list">
      {data.map((e) => {
        return (
          <Link
            href={`partners/${e.id}`}
            key={e.id}
            className="partner"
          >
            <h2 className="partner-heading">{e.name}</h2>
            <div className="partner-info">
              <p>Address : {e.address}</p>
              <p>Type : {e.type}</p>
              <p>SIRET : {e.siret}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PartnerCard;
