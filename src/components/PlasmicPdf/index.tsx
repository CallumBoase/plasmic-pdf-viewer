//////////////////////////////////////////////////////////////////////////////////////////////
//     plasmic-pdf                                                                          //
//     A responsive adaptation of the popular react-pdf library for use in plasmic.app      //
//////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { useState } from "react";

import { pdfjs, Document, Page } from "react-pdf"; // react-pdf components we'll use as a basis
import "react-pdf/dist/Page/AnnotationLayer.css"; // the annotation layer css ensures annotations are styled correctly overlaying the document
import "react-pdf/dist/Page/TextLayer.css"; // the text layer css ensures selectable text is styled correctly overlaying the document

// configure the global worker - for now this is done from a CDN but should be replaced with a more long-term reliable method
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = `pdfjs-dist/build/pdf.worker.min.js`;

import { DataProvider } from "@plasmicapp/loader-nextjs"; // allows a component to provide data back to Plasmic Studio
import { SizeMe } from "react-sizeme"; // react-pdf document/pages aren't responsive/sizable. Use to create responsiveness

export type PdfDocumentProps = {
  className?: string | undefined;
  children?: React.ReactNode;
  file: string;
};

export function PdfDocument({ className, children, file }: PdfDocumentProps) {
  const [pdfInfo, setPdfInfo] = useState(null);
  const [pdfPages, setPdfPages] = useState({});

  const onDocumentLoadSuccess = ({ _pdfInfo }: { _pdfInfo: any }) => {
    var pageArray = Array.from(new Array(_pdfInfo.numPages), (el, index) => ({
      pageNumber: index + 1,
    }));
    setPdfPages(pageArray);
    setPdfInfo(pdfInfo);
  };

  return (
    <Document
      file={file}
      // callback function to return key document information e.g. number of pages
      onLoadSuccess={onDocumentLoadSuccess}
      // className included to show styles picker within Plasmic Studio
      className={className}
    >
      <DataProvider name="PDFDocument" data={{ pdfInfo, pages: pdfPages }}>
        {children}
      </DataProvider>
    </Document>
  );
}

export type PdfPageProps = {
  className?: string;
  pageNumber: number;
  scale?: number;
  rotate?: number;
  renderTextLayer?: boolean;
  renderAnnotationLayer?: boolean;
};

export function PdfPage({
  className,
  pageNumber,
  scale,
  rotate,
  renderTextLayer,
  renderAnnotationLayer,
}: PdfPageProps) {
  return (
    <SizeMe monitorHeight refreshRate={128} refreshMode={"debounce"}>
      {({ size }) => (
        <div
          style={{ width: scale ? scale + "%" : undefined }}
          className={className}
        >
          <Page
            pageNumber={pageNumber}
            width={size.width || undefined}
            rotate={rotate}
            renderTextLayer={renderTextLayer}
            renderAnnotationLayer={renderAnnotationLayer}
          />
        </div>
      )}
    </SizeMe>
  );
}
