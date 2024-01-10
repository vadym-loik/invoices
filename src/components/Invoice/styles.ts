import { StyleSheet } from '@react-pdf/renderer';

// Create styles
export const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    fontSize: '12pt',
    padding: '1.5cm',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: '42pt',
  },
  hInputs: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  heading: {
    fontSize: 'large',
    fontWeight: 700,
  },
  companyInfo: {
    padding: '30px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  body: {
    padding: '30px',
  },
  bodyHeader: {
    marginBottom: '20px',
    fontSize: 'large',
    fontWeight: 700,
  },
  footer: {
    fontSize: 'small',
    fontWeight: 600,
    lineHeight: 1.4,
    padding: '30px',
  },
  row: {
    fontSize: '10pt',
  },
});
