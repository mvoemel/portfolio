import { Document, Page, pdfjs } from "react-pdf";
import { DownloadIcon } from "lucide-react";

import { WindowWrapper } from "../window-wrapper";
import { WindowControls } from "../window-controls";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

function Resume() {
  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>resume.pdf</h2>
        <a
          href="files/resume.pdf"
          download
          className="cursor-pointer"
          title="Download resume"
        >
          <DownloadIcon className="icon" />
        </a>
      </div>

      <Document file="files/resume.pdf">
        <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
      </Document>
    </>
  );
}

export const ResumeWindow = WindowWrapper(Resume, "resume");
