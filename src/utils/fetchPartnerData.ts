export default async function fetchPartnerData() {
  // const apiUrl = 'https://api.pappers.fr/v2/recherche';
  // const apiToken = process.env.NEXT_PUBLIC_API_TOKEN_PAPPERS;
  // const url = `${apiUrl}?api_token=${apiToken}&q={MELI DRIVER}`;
  // try {
  //   const response = await fetch(url);
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   const data = await response.json();
  //   if (data.resultats && data.resultats[0] && data.resultats[0].siege) {
  //     const partnerAddress = data.resultats[0].siege.adresse_ligne_1;
  //     console.log('Partner address:', partnerAddress);
  //     return partnerAddress;
  //   } else {
  //     throw new Error('Unexpected response structure');
  //   }
  // } catch (error) {
  //   console.error('Error fetching partner data:', error);
  //   return null;
  // }
}
