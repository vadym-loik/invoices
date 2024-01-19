import addPartnerAction from './action';

export default function AddForm() {
  return (
    <div className="partner-view">
      <h2 className="partner-heading">Ajouter un nouveau Partenaire</h2>
      <form
        className="edit-form"
        action={addPartnerAction}
      >
        <label>
          Nom:
          <input
            className="edit-input"
            required
            type="text"
            name="name"
            placeholder="Nom de partenaire"
          />
        </label>
        <label>
          Addresse:
          <input
            className="edit-input"
            required
            type="text"
            name="address"
            placeholder="Addresse"
          />
        </label>
        <label>
          Type:
          <input
            className="edit-input"
            required
            type="text"
            name="type"
            placeholder="Type"
          />
        </label>
        <label>
          Siret:
          <input
            className="edit-input"
            required
            type="text"
            name="siret"
            placeholder="No. SIRET"
          />
        </label>
        <button
          className="edit-btn"
          type="submit"
        >
          Ajouter Partnaire
        </button>
      </form>
    </div>
  );
}
