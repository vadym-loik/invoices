import { Document, Page, View, Text, Image } from '@react-pdf/renderer';
import image from './hopways_logo.png';
import { EntryType } from '@/utils/rows';
import { groupBy } from '../../utils/groupBy';
import { styles } from './styles';
import { Row } from '../Row/Row';
import { Cell } from '../Cell/Cell';
import { type Partner } from '@/db/schema';
import makeDate from '@/utils/makeDate';

// Create Invoice
const Invoice = ({
  data,
  companyData,
}: {
  data?: EntryType[];
  companyData?: Partner;
}) => {
  const date = makeDate(data ? data[0]['Date'] : undefined);

  const monthNumber = date.getMonth() + 1;
  const year = date.getFullYear();
  const invoiceNumber = `Facture #${monthNumber}/${year}`;

  // console.log(data);
  // console.log(companyData);

  // Assuming data is sorted in ascending order by date
  const firstEntryDate =
    data && data.length > 0 ? makeDate(data[0]['Date']) : undefined;

  // Create a new Date object for the first day of the month
  const firstDayOfMonth = new Date(
    firstEntryDate?.getFullYear() ?? 0,
    firstEntryDate?.getMonth() ?? 0,
    1
  );

  // Assuming data is sorted in ascending order by date
  const lastEntryDate =
    data && data.length > 0
      ? makeDate(data[data.length - 1]['Date'])
      : undefined;

  // Create a new Date object for the last day of the month
  const lastDayOfMonth = lastEntryDate
    ? new Date(lastEntryDate.getFullYear(), lastEntryDate.getMonth() + 1, 0)
    : undefined;

  // company types
  const typesWithTax = ['SAS', 'SA', 'SARL', 'EURL', 'SASU'];
  const shouldBeTaxed: boolean =
    companyData !== undefined &&
    companyData.type !== null &&
    typesWithTax.includes(companyData.type);

  const byDossier = data ? groupBy(data, 'Dossier') : {};

  const getTotalByGroupOfElements = (data: EntryType[]) => {
    return data
      .reduce((a, c) => {
        return a + parseFloat(c["Prix d'achat ht"]);
      }, 0)
      .toFixed(2);
  };

  const DossierGroup = ({ elements }: { elements: EntryType[] }) => {
    const totalOfDossiers = getTotalByGroupOfElements(elements);
    return (
      <View style={{ marginBottom: '10pt' }}>
        {elements.map((e) => {
          const price = parseFloat(e["Prix d'achat ht"]);

          const tax = shouldBeTaxed ? 10 / 110 : 1.0;
          const tva = shouldBeTaxed ? 10 : undefined;

          const priceWithoutTaxes = shouldBeTaxed
            ? parseFloat((price - price * tax).toFixed(2))
            : undefined;

          return (
            <Row
              key={e.Date}
              dossier={e['Nom client']
                ?.toLowerCase()
                .replace(/(^|\s)\S/g, (L) => L.toUpperCase())}
              statusMission={
                e['Statut mission'] === 'Annulé' ? 'Annulée' : 'Terminée'
              }
              date={e.Date}
              priceWithoutTaxes={priceWithoutTaxes}
              TVA={tva}
              priceTTC={price}
            />
          );
        })}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Cell></Cell>
          <Cell></Cell>
          <Cell></Cell>
          {/* <Cell></Cell> */}
          {/* <Cell></Cell> */}
          {/* <Cell></Cell>
          <Cell></Cell> */}
          {+totalOfDossiers > 0 && (
            <Cell
              wrap={false}
              style={{
                fontSize: '10pt',
                borderRadius: '5px',
                margin: '5px',
                padding: '5px',
                backgroundColor: '#f7eccd',
              }}
            >
              Total TTC: {totalOfDossiers} €
            </Cell>
          )}
        </View>
      </View>
    );
  };

  const newTotal = Object.values(byDossier)
    .map(getTotalByGroupOfElements)
    .reduce((a, c) => a + parseFloat(c), 0)
    .toFixed(2);

  return (
    <Document>
      <Page
        size="A4"
        style={styles.page}
      >
        <View style={styles.header}>
          <Image
            src="/hopways_logo.png"
            style={{ height: image.height / 4 + 'pt' }}
          />
          <div className="invoice-header__inputs">
            <Text>{invoiceNumber}</Text>
            <div className="input-wrap">
              <Text>
                Début période :{' '}
                {new Intl.DateTimeFormat('fr-FR').format(firstDayOfMonth)}
              </Text>
            </div>
            <div className="input-wrap">
              <Text>
                Fin période :{' '}
                {new Intl.DateTimeFormat('fr-FR').format(lastDayOfMonth)}
              </Text>
            </div>
          </div>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginBottom: '24px',
          }}
        >
          <View>
            <div
              className="partner-info"
              style={{ maxWidth: '220px' }}
            >
              <Text
                style={{
                  color: '#eece6e',
                }}
              >
                {'Émetteur'}
              </Text>
              <Text>{companyData?.name}</Text>
              <Text>{`Adresse : ${companyData?.address}`}</Text>
              <Text>{`N° Siret : ${companyData?.siret}`}</Text>
            </div>
          </View>
          <View>
            <div className="hopways-info">
              <Text>{'HOPWAYS'}</Text>
              <Text>{"7 QUAI DE L'AEROPLANE"}</Text>
              <Text>{"93450  L'ILE-SAINT-DENIS"}</Text>
              <Text>{'Tél : +33 6.51.37.89.25'}</Text>
              <Text>{'Mail : contact@hopways.com'}</Text>
              <div className="siret">
                <Text>{'RCS : 794 581 603 Bobigny'}</Text>
                <Text>{'N° Siret : 79458160300022'}</Text>
              </div>
            </div>
          </View>
        </View>
        <View style={{ flexGrow: 1 }}>
          <View>
            <div className="invoice-body__header">
              <Text style={{ marginBottom: '20px' }}>
                {`Objet : Facturation chauffeur pour période : ${new Intl.DateTimeFormat(
                  'fr-FR'
                ).format(firstDayOfMonth)} au ${new Intl.DateTimeFormat(
                  'fr-FR'
                ).format(lastDayOfMonth)}`}
              </Text>
            </div>
          </View>
          <View>
            <View style={{ display: 'flex', flexDirection: 'column' }}>
              <View fixed>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderRadius: '5px',
                    padding: '5px',
                    backgroundColor: '#eece6e',
                    marginBottom: '10px',
                  }}
                >
                  <Cell>{'Dossier'}</Cell>
                  <Cell>{'Statut'}</Cell>
                  <Cell>{'Date'}</Cell>
                  {typesWithTax.includes(companyData?.type ?? '') && (
                    <Cell>{'Prix HT'}</Cell>
                  )}
                  {typesWithTax.includes(companyData?.type ?? '') && (
                    <Cell>{'TVA'}</Cell>
                  )}
                  <Cell>{'Prix TTC'}</Cell>
                </View>
              </View>

              {Object.values(byDossier).map((dossier, i) => {
                return (
                  <DossierGroup
                    key={i}
                    elements={dossier}
                  />
                );
              })}
              <View>
                <View
                  wrap={false}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderRadius: '5px',
                    padding: '10px',
                    backgroundColor: '#eece6e',
                  }}
                >
                  <Cell>{'Total'}</Cell>
                  <Cell> </Cell>
                  <Cell> </Cell>
                  <Cell> </Cell>
                  <Cell> </Cell>
                  <Cell> </Cell>
                  <Cell>{newTotal} €</Cell>
                </View>
                {shouldBeTaxed === false ? (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderRadius: '5px',
                      padding: '10px',
                    }}
                  >
                    <Cell>{'TVA non applicable, article 293B du CGI.'}</Cell>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: '24pt' }}>
          <Text>{`date d'édition : ${new Date().toLocaleDateString(
            'fr-FR'
          )}`}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
