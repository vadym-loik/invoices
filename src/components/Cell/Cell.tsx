import ReactPDF from '@react-pdf/renderer';
import { Text } from '@react-pdf/renderer';

export function Cell({
  children,
  style,
  ...rest
}: ReactPDF.TextProps & { children?: React.ReactNode }) {
  return (
    <Text
      style={{ flex: 1, textAlign: 'center', ...style }}
      {...rest}
    >
      {children}
    </Text>
  );
}
