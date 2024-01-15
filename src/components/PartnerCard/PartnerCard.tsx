import { Partner } from '@/db/schema';
import './partnerCard.scss';

const PartnerCard = ({ data }: { data: Partner[] }) => {
  return (
    <div className="list">
      {data.map((e) => {
        return (
          <div
            key={e.id}
            className="partner"
          >
            <h2 className="partner-heading">{e.name}</h2>
            <div className="partner-info">
              <p>Address : {e.address}</p>
              <p>Type : {e.type}</p>
              <p>SIRET : {e.siret}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PartnerCard;
