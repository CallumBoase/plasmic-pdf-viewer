import { CodeComponentMeta } from "@plasmicapp/host";
import { PdfDocumentProps, PdfPageProps } from ".";

export const PdfPageMeta: CodeComponentMeta<PdfDocumentProps> = {
  name: "PdfPage",
  importPath: './index',
  props: {
    pageNumber: {
      type: "number",
      defaultValue: 1,
    },
    scale: {
      type: "number",
      displayName: "Scale Width (% of parent)",
      helpText:
        "Leave blank to display original page size (or 100% width if > container width)",
    },
    rotate: {
      type: "number",
      defaultValue: 0,
    },
    renderTextLayer: {
      type: "boolean",
      defaultValue: true,
    },
    renderAnnotationLayer: {
      type: "boolean",
      defaultValue: true,
    },
  },
  defaultStyles: {
    width: "100%",
  },
};

export const PdfDocumentMeta: CodeComponentMeta<PdfPageProps> = {
  name: "PdfDocument",
  importPath: './index',
  props: {
    file: "string",
    children: "slot",
  },
  defaultStyles: {
    width: "100%",
  },
  providesData: true,
};
