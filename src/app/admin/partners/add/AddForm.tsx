import addPartnerAction from './action';

export default function AddForm() {
  return (
    <div>
      <h2>Ajouter un nouveau Partenaire</h2>
      <form action={addPartnerAction}>
        <label>
          Nom:
          <input
            required
            type="text"
            name="name"
            placeholder="Nom de partenaire"
          />
        </label>
        <label>
          Addresse:
          <input
            required
            type="text"
            name="address"
            placeholder="Addresse"
          />
        </label>
        <label>
          Type:
          <input
            required
            type="text"
            name="type"
            placeholder="Type"
          />
        </label>
        <label>
          Siret:
          <input
            required
            type="text"
            name="siret"
            placeholder="No. SIRET"
          />
        </label>
        <button type="submit">Ajouter Partnaire</button>
      </form>
    </div>
  );
}
