import React, { useState, useEffect, useRef } from "react";

import { useWindowStore } from "@/stores/window-store";
import { fileSystemRoot } from "@/lib/constants";
import type { FolderItem } from "@/lib/types";

import { WindowWrapper } from "./window-wrapper";
import { WindowControls } from "./window-controls";

type TerminalLine =
  | { type: "input"; content: string; path: string }
  | { type: "output"; content: React.ReactNode };

function Terminal() {
  const { openWindow, closeWindow } = useWindowStore();

  const [input, setInput] = useState("");
  const [output, setOutput] = useState<TerminalLine[]>([
    {
      type: "output",
      content: "Welcome to Michael's Terminal. Type 'help' to get started.",
    },
  ]);

  const [pathStack, setPathStack] = useState<FolderItem[]>([fileSystemRoot]);
  const currentFolder = pathStack[pathStack.length - 1];

  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const addToOutput = (lines: (TerminalLine | string)[]) => {
    const formattedLines: TerminalLine[] = lines.map((line) =>
      typeof line === "string" ? { type: "output", content: line } : line,
    );
    setOutput((prev) => [...prev, ...formattedLines]);
  };

  const handleCommand = (cmdString: string) => {
    const trimmedCmd = cmdString.trim();
    if (!trimmedCmd) {
      addToOutput([{ type: "input", content: "", path: currentFolder.name }]);
      return;
    }

    const newLog: TerminalLine[] = [
      { type: "input", content: cmdString, path: currentFolder.name },
    ];

    setCmdHistory((prev) => [...prev, cmdString]);
    setHistoryIndex(-1);

    const [cmd, ...args] = trimmedCmd.split(" ");
    const arg = args.join(" ");

    switch (cmd) {
      case "help":
        newLog.push({
          type: "output",
          content: (
            <div className="space-y-1 text-gray-300">
              <p>
                <span className="text-orange-400">cat &lt;file&gt;</span> - See
                the content of &lt;file&gt;
              </p>
              <p>
                <span className="text-orange-400">open &lt;file&gt;</span> -
                Open the &lt;file&gt; with the available app
              </p>
              <p>
                <span className="text-orange-400">cd &lt;dir&gt;</span> - Move
                into &lt;dir&gt;, "cd .." for parent, "cd ~" for root
              </p>
              <p>
                <span className="text-orange-400">ls</span> - See files and
                directories in the current directory
              </p>
              <p>
                <span className="text-orange-400">clear</span> - Clear the
                screen
              </p>
              <p>
                <span className="text-orange-400">exit</span> - Close this
                window
              </p>
              <p>
                <span className="text-orange-400">rm -rf /</span> - Don't do
                this
              </p>
            </div>
          ),
        });
        break;

      case "clear":
        setOutput([]);
        setInput("");
        return;

      case "exit":
        setOutput([]);
        setInput("");
        closeWindow("terminal");
        return;

      case "ls":
        newLog.push({
          type: "output",
          content: (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 max-w-lg">
              {currentFolder.children.map((child) => (
                <span
                  key={child.id}
                  className={
                    child.kind === "folder"
                      ? "text-blue-400 font-bold"
                      : "text-gray-300"
                  }
                >
                  {child.name}
                </span>
              ))}
            </div>
          ),
        });
        break;

      case "cd":
        if (!arg || arg === "~" || arg === "/") {
          setPathStack([fileSystemRoot]);
        } else if (arg === "..") {
          if (pathStack.length > 1) {
            setPathStack((prev) => prev.slice(0, -1));
          }
        } else {
          const target = currentFolder.children.find(
            (c) =>
              c.name.toLowerCase() === arg.toLowerCase() && c.kind === "folder",
          );
          if (target) {
            setPathStack((prev) => [...prev, target as FolderItem]);
          } else {
            newLog.push({
              type: "output",
              content: `cd: no such file or directory: ${arg}`,
            });
          }
        }
        break;

      case "cat": {
        const fileToRead = currentFolder.children.find(
          (c) => c.name === arg && c.kind === "file",
        );
        if (fileToRead && fileToRead.kind === "file") {
          if (
            fileToRead.meta.type === "text" ||
            fileToRead.meta.type === "code"
          ) {
            newLog.push({
              type: "output",
              content: (
                <pre className="whitespace-pre-wrap font-mono">
                  {fileToRead.meta.content}
                </pre>
              ),
            });
          } else {
            newLog.push({
              type: "output",
              content: `Binary file ${arg} cannot be printed. Use 'open'.`,
            });
          }
        } else {
          newLog.push({ type: "output", content: `cat: ${arg}: No such file` });
        }
        break;
      }

      case "open": {
        const fileToOpen = currentFolder.children.find((c) => c.name === arg);
        if (fileToOpen) {
          if (fileToOpen.kind === "folder") {
            // TODO: open finder with this folder
            newLog.push({ type: "output", content: `${arg} is a directory.` });
          } else {
            if (fileToOpen.meta.type === "link") {
              window.open(fileToOpen.meta.href, "_blank");
              newLog.push({ type: "output", content: `Opening ${arg}...` });
            } else {
              openWindow("preview", fileToOpen);
              newLog.push({ type: "output", content: `Opening ${arg}...` });
            }
          }
        } else {
          newLog.push({
            type: "output",
            content: `open: ${arg}: No such file`,
          });
        }
        break;
      }

      case "rm":
        if (arg === "-rf /") {
          newLog.push({ type: "output", content: "nice try :)" });
        } else {
          newLog.push({ type: "output", content: "Permission denied" });
        }
        break;

      default:
        newLog.push({ type: "output", content: `command not found: ${cmd}` });
    }

    addToOutput(newLog);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < cmdHistory.length) {
          setHistoryIndex(newIndex);
          setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <>
      <div className="window-header bg-bg-tertiary">
        <WindowControls target="terminal" />

        <div className=" w-full flex justify-center">
          <h2 className="text-text-secondary">mvoemel@michaels-macbook</h2>
        </div>
      </div>

      <div
        className="flex-1 bg-terminal-bg text-terminal-text h-100 p-4 font-mono text-sm overflow-y-scroll cursor-text rounded-b-xl shadow-inner"
        onClick={handleContainerClick}
      >
        {output.map((line, i) => (
          <div key={i} className="mb-1 leading-relaxed wrap-break-word">
            {line.type === "input" ? (
              <div className="flex flex-wrap gap-x-2">
                <span className="text-green-400 font-bold whitespace-nowrap">
                  mvoemel@michaels-macbook:
                </span>
                <span className="text-yellow-400 whitespace-nowrap">
                  {line.path === "Home" ? "~" : line.path} &gt;
                </span>
                <span className="text-gray-100">{line.content}</span>
              </div>
            ) : (
              <div className="text-gray-300">{line.content}</div>
            )}
          </div>
        ))}

        <div className="flex flex-wrap gap-x-2">
          <span className="text-green-400 font-bold whitespace-nowrap">
            mvoemel@michaels-macbook:
          </span>
          <span className="text-yellow-400 whitespace-nowrap">
            {currentFolder.name === "Home" ? "~" : currentFolder.name} &gt;
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-gray-100 min-w-12.5"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </>
  );
}

export const TerminalWindow = WindowWrapper(
  Terminal,
  "terminal",
  "w-xl absolute left-1/12 top-32 bg-bg-tertiary rounded-xl shadow-2xl drop-shadow-2xl overflow-hidden",
);
