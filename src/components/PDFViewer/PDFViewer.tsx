'use client';
import ReactPDF, { PDFViewer as Wrapper } from '@react-pdf/renderer';

const PDF = ({
  children,
}: {
  children?: React.ReactElement<ReactPDF.DocumentProps>;
}) => {
  return (
    <Wrapper showToolbar={false} height={1100} width={800}>
      {children}
    </Wrapper>
  );
};

export default PDF;
