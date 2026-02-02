import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { DownloadIcon } from "lucide-react";

import { useWindowStore } from "@/stores/window-store";
import type { FileSystemItem } from "@/lib/types";

import { WindowWrapper } from "./window-wrapper";
import { WindowControls } from "./window-controls";

function Preview() {
  const file = useWindowStore((state) => state.windows.preview.data) as
    | FileSystemItem
    | undefined;

  if (!file || file.kind !== "file") {
    return (
      <div className="flex flex-col h-full">
        <div className="window-header">
          <WindowControls target="preview" />
          <span className="text-sm font-semibold text-text-secondary">
            Preview
          </span>
          <div className="w-4" /> {/* Spacer for centering */}
        </div>
        <div className="flex-1 flex items-center justify-center text-text-secondary">
          No file selected
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    if (!file || !file.downloadable) return;

    if (file.meta.type === "text" || file.meta.type === "code") {
      const blob = new Blob([file.meta.content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    } else if (
      (file.meta.type === "image" || file.meta.type === "pdf") &&
      file.meta.src
    ) {
      const a = document.createElement("a");
      a.href = file.meta.src;
      a.download = file.name;
      a.click();
    }
  };

  const renderContent = () => {
    const { meta, extension } = file;

    if (meta.type === "text" && extension === "md") {
      return (
        <div className="p-6 prose dark:prose-invert max-w-none overflow-y-auto h-full bg-bg-primary text-text-primary">
          <ReactMarkdown>{meta.content}</ReactMarkdown>
        </div>
      );
    }

    if (meta.type === "text") {
      return (
        <div className="p-4 h-full bg-bg-primary overflow-y-auto">
          <pre className="whitespace-pre-wrap font-mono text-sm text-text-primary">
            {meta.content}
          </pre>
        </div>
      );
    }

    if (meta.type === "code") {
      return (
        <div className="h-full overflow-hidden text-sm">
          <SyntaxHighlighter
            language={meta.language}
            style={vscDarkPlus}
            customStyle={{ margin: 0, height: "100%", borderRadius: 0 }}
            showLineNumbers
          >
            {meta.content}
          </SyntaxHighlighter>
        </div>
      );
    }

    if (meta.type === "image") {
      return (
        <div className="flex items-center justify-center h-full bg-bg-primary">
          <img
            src={meta.src}
            alt={file.name}
            className="max-w-full max-h-full object-contain p-4 shadow-sm"
          />
        </div>
      );
    }

    if (meta.type === "pdf") {
      const pdfUrl = `${meta.src}#toolbar=0&navpanes=0&view=FitH`;

      return (
        <iframe src={pdfUrl} title={file.name} className="w-full h-full" />
      );
    }

    return (
      <div className="flex items-center justify-center h-full text-text-secondary">
        File format not supported
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="window-header">
        <WindowControls target="preview" />

        <div className="flex items-center gap-2">
          {file.icon && (
            <img src={file.icon} alt="" className="size-4 opacity-70" />
          )}
          <span className="text-sm font-semibold text-text-secondary">
            {file.name}
          </span>
        </div>

        {file.downloadable && (
          <button
            onClick={handleDownload}
            className="p-1.5 text-text-secondary hover:bg-bg-tertiary rounded transition-colors cursor-pointer"
            title="Download"
          >
            <DownloadIcon size={18} />
          </button>
        )}

        {!file.downloadable && <div className="w-4" />}
      </div>

      <div className="flex-1 overflow-hidden relative">{renderContent()}</div>
    </div>
  );
}

export const PreviewWindow = WindowWrapper(
  Preview,
  "preview",
  "w-3xl h-[600px] bg-bg-tertiary rounded-xl shadow-2xl overflow-hidden flex flex-col",
);
