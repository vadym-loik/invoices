import React from 'react';
import { Partner } from '@/db/schema';
import handleUpdate from './action';
import './partnerId.scss';
import SubmitButton from '@/components/SubmitButton/SubmitButton';

interface EditPartnerFormProps {
  partner: Partner;
}

const EditPartnerForm: React.FC<EditPartnerFormProps> = ({ partner }) => {
  const action = handleUpdate.bind(null, partner.id);

  return (
    <div className="edit">
      <h2 className="edit-title">Edit Partner Information</h2>
      <form
        className="edit-form"
        action={action}
      >
        <label>
          {'Nom: '}
          <input
            className="edit-input"
            required
            type="text"
            name="name"
            defaultValue={partner.name}
          />
        </label>
        <label>
          {'Adresse: '}
          <input
            className="edit-input"
            required
            type="text"
            name="address"
            defaultValue={partner.address}
          />
        </label>
        <label>
          {'Type: '}
          <input
            className="edit-input"
            required
            type="text"
            name="type"
            defaultValue={partner.type}
          />
        </label>
        <label>
          {'SIRET: '}
          <input
            className="edit-input"
            required
            type="text"
            name="siret"
            defaultValue={partner.siret}
          />
        </label>
        <SubmitButton
          className="edit-btn"
          type="submit"
        >
          Partenaire de mise à jour
        </SubmitButton>
      </form>
    </div>
  );
};

export default EditPartnerForm;
