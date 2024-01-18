'use client';
import { getPartnerById, updatePartnerById } from '@/db/schema';
import './partnerId.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { Partner } from '@/db/schema';

interface EditPartnerFormProps {
  partner: Partner;
  onUpdate: () => void;
}

const EditPartnerForm: React.FC<EditPartnerFormProps> = ({
  partner,
  onUpdate,
}) => {
  const [editedPartner, setEditedPartner] = useState<Partner>({ ...partner });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedPartner((prevPartner) => ({ ...prevPartner, [name]: value }));
  };

  const handleUpdate = async () => {
    await updatePartnerById(
      editedPartner.id,
      editedPartner.address,
      editedPartner.name,
      editedPartner.siret,
      editedPartner.type
    );
    onUpdate(); // Trigger a callback to refresh partner data in the parent component
  };

  return (
    <div>
      <h2>Edit Partner Information</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={editedPartner.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={editedPartner.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={editedPartner.type}
            onChange={handleChange}
          />
        </label>
        <label>
          Siret:
          <input
            type="text"
            name="siret"
            value={editedPartner.siret}
            onChange={handleChange}
          />
        </label>
        <button
          type="button"
          onClick={handleUpdate}
        >
          Update Partner
        </button>
      </form>
    </div>
  );
};

const Partner: React.FC<{ params: { partnerId: number } }> = ({ params }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [partner, setPartner] = useState<Partner | null>(null);

  const fetchPartner = useCallback(async () => {
    const partner = await getPartnerById(params.partnerId);
    setPartner(partner);
  }, [params.partnerId]);

  useEffect(() => {
    fetchPartner();
  }, [fetchPartner]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    setIsEditing(false);
    fetchPartner();
  };

  if (!partner) {
    return <div>Partner not found</div>;
  }

  return (
    <div className="partner-view">
      <h1 className="partner-heading">{partner.name}</h1>
      <div className="partner-info">
        <p>{partner.address}</p>
        <p>{partner.type}</p>
        <p>{partner.siret}</p>
      </div>
      {isEditing ? (
        <EditPartnerForm
          partner={partner}
          onUpdate={handleUpdate}
        />
      ) : (
        <button onClick={handleEditClick}>Edit Partner</button>
      )}
    </div>
  );
};

export default Partner;
