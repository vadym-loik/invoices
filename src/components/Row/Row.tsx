import { View, Text } from '@react-pdf/renderer';

// Create Document Component
export function Row({
  dossier,
  statusMission,
  date,
  driver,
  priceWithoutTaxes,
  TVA,
  priceTTC,
}: {
  dossier: string;
  statusMission: string;
  date: string;
  driver: string;
  priceWithoutTaxes: number | undefined;
  TVA: number | undefined;
  priceTTC: number;
}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text style={{ flex: 1, textAlign: 'center' }}>{dossier}</Text>
      <Text style={{ flex: 1, textAlign: 'center' }}>{statusMission}</Text>
      <Text style={{ flex: 1, textAlign: 'center' }}>{date}</Text>
      <Text style={{ flex: 1, textAlign: 'center' }}>{driver}</Text>
      {priceWithoutTaxes !== undefined ? (
        <Text style={{ flex: 1, textAlign: 'center' }}>{priceWithoutTaxes} €</Text>
      ) : (
        // <Text style={{ flex: 1, textAlign: 'center' }}></Text>
        null
      )}
      {TVA !== undefined ? (
        <Text style={{ flex: 1, textAlign: 'center' }}>{TVA} %</Text>
      ) : (
        // <Text style={{ flex: 1, textAlign: 'center' }}></Text>
        null
      )}
      <Text style={{ flex: 1, textAlign: 'center' }}>{priceTTC} €</Text>
    </View>
  );
}
