import { EntryType } from "./rows";

export function generateEntries(count: number): EntryType[] {
  const entries: EntryType[] = [];

  for (let i = 1; i <= count; i++) {
    const entry: EntryType = {
      Dossier: `D${i}`,
      "Prix d'achat ht": `${Math.floor(Math.random() * 1000) + 500}`,
      "Facture n°": `F${i}`,

      "Numéro de mission": "M123",
      Version: "1.0",
      "Statut mission": "En cours",
      "Type de service": "Transport",
      Date: "2023-12-22",
      "Heure début mission": "09:00",
      "Heure fin mission": "12:00",
      "Début de service": "08:30",
      "Fin de service": "12:30",
      "Nom client": "ABC Company",
      Passagers: "John Doe, Jane Doe",
      Pax: "2",
      "Prise en charge": "Airport",
      Itinéraire: "Airport to Hotel",
      "Km début": "50",
      "Km fin": "80",
      Destination: "Hotel",
      "Note au chauffeur": "Special instructions for the driver",
      "Tout type de véhicule\n\n": "Sedan",
      "Modèle de véhicule": "Toyota Camry",
      Voiture: "ABC123",
      Partenaire: "XYZ Transport",
      "Partenaire Fixe": "Yes",
      "Partenaire mobile": "No",
      "Prénom chauffeur": "David",
      "Nom chauffeur": `Smith${i}`,
      "chauffeur mobile 1": "987654321",
      "chauffeur mobile 2": "",
      "Heure inclus au devis": "3",
      "Km inclus au devis": "60",
      Libellé: "Transportation Service",
      "Montant HT total des frais additionnels": "50",
      "Prix de vente HT": "700",
      "Montant TVA": "140",
      "Prix de vente TTC": "840",
      "Commentaire chauffeur": "Driver feedback and comments",
      Référence: "R123",
      "N° Vol": "V456",
      Terminal: "T1",
      "Ville provenance": "Airport City",
      "Vol heure": "14:30",
      "Vol avance": "30",
      "Heures réelles chauffeur (format 01:00)": "3:30",
      "Stand by": "Yes",
      "Forfait net chauffeur": "600",
      "Processus Shuttle": "No",
      "Commentaire dossier": "Additional comments about the mission",
      "Référence client du dossier": "C789",
      "Légende de mission": "Regular",
      "Montant Ht annulé": "100",
      "Montant Ttc annulé": "120",
      "Nom du contact client": "Alice Johnson",
    };

    entries.push(entry);
  }

  return entries;
}
