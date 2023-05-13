import  { useState } from 'react';
import { Document, Page } from 'react-pdf';

const PdfPreview = (myFile  : File) => {
  const [numPages, setNumPages] = useState( null );
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = (numPages : any ) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <div>
      <Document
        file={myFile}
        onLoadSuccess={onDocumentLoadSuccess}
        options={{ workerSrc: '/pdf.worker.js' }} 
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};

export default PdfPreview;
