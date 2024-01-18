import React from 'react';
import { Partner } from '@/db/schema';
import handleUpdate from './action';

interface EditPartnerFormProps {
  partner: Partner;
}

const EditPartnerForm: React.FC<EditPartnerFormProps> = ({ partner }) => {
  const action = handleUpdate.bind(null, partner.id);

  return (
    <div>
      <h2>Edit Partner Information</h2>
      <form action={action}>
        <label>
          Name:
          <input
            required
            type="text"
            name="name"
            defaultValue={partner.name}
          />
        </label>
        <label>
          Address:
          <input
            required
            type="text"
            name="address"
            defaultValue={partner.address}
          />
        </label>
        <label>
          Type:
          <input
            required
            type="text"
            name="type"
            defaultValue={partner.type}
          />
        </label>
        <label>
          Siret:
          <input
            required
            type="text"
            name="siret"
            defaultValue={partner.siret}
          />
        </label>
        <button type="submit">Update Partner</button>
      </form>
    </div>
  );
};

export default EditPartnerForm;
