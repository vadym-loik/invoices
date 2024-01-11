'use client';
import Invoice from '@/components/Invoice/Invoice';
import { getPartnerData, type Partner } from '@/db/schema';
import { groupBy } from '@/utils/groupBy';
import { makePdfFile } from '@/utils/makePdfFile';
import { EntryType } from '@/utils/rows';
import JSZip from 'jszip';
import dynamic from 'next/dynamic';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import './pdfGenerator.scss';

const PDFViewer = dynamic(() => import('../PDFViewer/PDFViewer'), {
  ssr: false,
  loading: () => {
    return <div>Loading PDF...</div>;
  },
});

const PDFGenerator = ({ data }: { data: Partner[] }) => {
  const [csvData, setCSVData] = useState<EntryType[]>([]);
  const [partner, setPartner] = useState<string>();
  const [partnerDataAndDB, setPartnerDataAndDB] = useState<{
    partnerData: EntryType[];
    partnerDataFromDB?: Partner;
  }>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (partner && partner.length > 0) {
      const p = csvData.filter((e) => {
        return e.Partenaire === partner;
      });

      setPartnerDataAndDB({
        partnerData: p,
        partnerDataFromDB: data.find(
          (elem) => elem.name.toLowerCase() === partner.toLowerCase()
        ),
      });
    }
  }, [partner, csvData, data]);

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const fd = new FormData();
    file && fd.append('files', file);

    file &&
      Papa.parse(file, {
        complete: (result) => {
          setCSVData(result.data as EntryType[]);
        },
        header: true,
        encoding: 'UTF-8',
      });
  };

  const handleDownload = async () => {
    if (
      !partnerDataAndDB ||
      !partnerDataAndDB.partnerDataFromDB ||
      !partnerDataAndDB.partnerData
    )
      return;

    setLoading(true);

    const file = await makePdfFile(
      partnerDataAndDB.partnerData,
      partnerDataAndDB.partnerDataFromDB
    );

    await fetch(
      `/api/invoices?partner=${partnerDataAndDB.partnerDataFromDB.id}`,
      {
        method: 'POST',
        body: file.blob,
        headers: {
          'Content-Type': 'application/pdf',
        },
      }
    );

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(file.blob);

    // Specify the file name for the download
    downloadLink.download = file.filename;

    // Append the download link to the document
    document.body.appendChild(downloadLink);

    // Trigger a click on the download link
    downloadLink.click();

    // Remove the download link from the document
    document.body.removeChild(downloadLink);
    setLoading(false);
  };

  // Extract unique Partenaires
  const uniquePartners = [...new Set(csvData?.map((item) => item.Partenaire))];

  return (
    <>
      <form
        className="home"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div
          className="row"
          id="first-row"
        >
          <div>
            {/* <label htmlFor="csv">{'Choisir CSV : '}</label> */}
            <input
              type="file"
              name="csv"
              id="csv"
              className="home-input"
              onChange={handleFileUpload}
            />
          </div>
          {csvData.length > 0 && data.length > 0 && (
            <button
              className="home-btn"
              type="button"
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                const orderedPartnerData = Object.values(
                  groupBy(csvData, 'Partenaire')
                );

                const blobs = await Promise.all(
                  orderedPartnerData.map(
                    async (pData) =>
                      await makePdfFile(
                        pData,
                        data.find(
                          (elem) =>
                            elem.name.toLowerCase() ===
                            pData[0].Partenaire?.toLowerCase()
                        )
                      )
                  )
                );
                const zip = new JSZip();

                const files = new FormData();

                blobs.forEach((b) => {
                  zip.file(b.filename, b.blob);
                  files.append('files', b.blob, b.id.toString());
                });

                await fetch('/api/invoices/many', {
                  method: 'POST',
                  body: files,
                });
                zip.generateAsync({ type: 'blob' }).then(function (content) {
                  const downloadLink = document.createElement('a');
                  downloadLink.href = URL.createObjectURL(content);

                  // Specify the file name for the download
                  downloadLink.download = 'archive.zip';

                  // Append the download link to the document
                  document.body.appendChild(downloadLink);

                  // Trigger a click on the download link
                  downloadLink.click();

                  // Remove the download link from the document
                  document.body.removeChild(downloadLink);
                });
                setLoading(false);
              }}
            >
              {loading ? 'Veiullez attendre...' : 'Faire des pdfs'}
            </button>
          )}
        </div>
        <div
          className="row"
          id="second-row"
        >
          {csvData.length > 0 && data.length > 0 && (
            <div>
              <select
                style={{ width: '100%' }}
                name="partners"
                className="home-partners"
                id="partners"
                defaultValue={'default'}
                onChange={(e) => {
                  setPartner(e.currentTarget.value);
                }}
              >
                <option
                  value="default"
                  disabled
                >
                  Choisir partenaire
                </option>
                {uniquePartners?.map((partner, key) => {
                  return (
                    <option
                      key={key}
                      value={partner}
                    >
                      {partner?.toUpperCase()}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          {partner !== undefined && (
            <button
              className="home-btn"
              onClick={handleDownload}
              disabled={loading}
            >
              {loading ? 'Veiullez attendre...' : 'Telecharger'}
            </button>
          )}
        </div>
      </form>
      {partner !== undefined && (
        <PDFViewer>
          <Invoice
            data={partnerDataAndDB?.partnerData}
            companyData={partnerDataAndDB?.partnerDataFromDB}
          ></Invoice>
        </PDFViewer>
      )}
    </>
  );
};

export default PDFGenerator;
