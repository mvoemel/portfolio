import { SearchIcon, GlobeIcon } from "lucide-react";
import { useState, useMemo } from "react";

import { WindowWrapper } from "./window-wrapper";
import { WindowControls } from "./window-controls";
import { safariLinks } from "@/lib/constants";

function Safari() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGroups = useMemo(() => {
    if (!searchQuery) return safariLinks;

    const lowerQuery = searchQuery.toLowerCase();

    return safariLinks
      .map((group) => ({
        ...group,
        links: group.links.filter(
          (link) =>
            link.name.toLowerCase().includes(lowerQuery) ||
            link.href.toLowerCase().includes(lowerQuery),
        ),
      }))
      .filter((group) => group.links.length > 0);
  }, [searchQuery]);

  return (
    <div className="flex flex-col h-full w-full bg-bg-primary/50 backdrop-blur-xl">
      <div className="window-header text-text-secondary bg-bg-tertiary/90 shrink-0">
        <WindowControls target="safari" />
        <div className="flex items-center gap-3 w-2/3 bg-bg-secondary/50 rounded-lg px-3 py-1.5 transition-colors focus-within:bg-bg-primary border border-transparent focus-within:border-black/5 dark:focus-within:border-white/10">
          <SearchIcon size={14} className="opacity-50" />

          <input
            type="text"
            placeholder="Search or enter website name"
            className="flex-1 bg-transparent outline-none placeholder:text-text-tertiary text-sm text-center focus:text-left transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-4" /> {/* Spacer for visual balance with controls */}
      </div>

      <div className="flex-1 overflow-y-auto p-10 min-h-100">
        <div className="max-w-4xl mx-auto space-y-12">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xl font-bold text-text-secondary mb-2">
                  {group.title}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-6">
                  {group.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center gap-3 p-2 rounded-lg hover:bg-bg-tertiary/50 transition-colors"
                    >
                      <div className="size-12 bg-bg-tertiary rounded-lg shadow-sm flex items-center justify-center text-3xl overflow-hidden group-hover:scale-105 transition-transform duration-200">
                        {link.icon ? (
                          <img
                            src={link.icon}
                            alt={link.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <GlobeIcon className="w-8 h-8 text-text-tertiary" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                        {link.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-text-tertiary mt-20">
              <p className="text-lg">No results found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const SafariWindow = WindowWrapper(
  Safari,
  "safari",
  "w-4xl absolute left-2/12 top-40 bg-bg-secondary rounded-xl shadow-2xl drop-shadow-2xl overflow-hidden",
);
