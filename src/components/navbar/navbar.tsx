import { useEffect, useState } from "react";

import { useFinderStore } from "@/stores/finder-store";
import { useWindowStore } from "@/stores/window-store";
import { navLinks, navIcons, navSystemDropdown } from "@/lib/constants";
import type { NavLinkItem } from "@/lib/types";
import { findItemByPath } from "@/lib/file-system";
import { cn } from "@/lib/util";

import { Clock } from "./clock";
import { ControlCenter } from "./control-center";
import { Spotlight } from "./spotlight";

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);

  const { changeDirectory } = useFinderStore();
  const { openWindow } = useWindowStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSpotlight((prev) => !prev);
        setShowControlCenter(false);
        setActiveMenu(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOutsideClick = () => {
    setActiveMenu(null);
    setShowControlCenter(false);
  };

  const handleSystemAction = (action: string) => {
    switch (action) {
      case "href":
        // TODO: implement
        break;
      case "clipboard":
        navigator.clipboard.writeText(window.location.href);
        break;
      case "reset":
        window.location.reload(); // TODO: close all windows instead of reloading page
        break;
      case "close":
        window.close(); // TODO: does not work (only works if script opened the tab)
        break;

      default:
        console.warn("Unknown action", action);
        break;
    }

    setActiveMenu(null);
  };

  const handleNavLink = (link: NavLinkItem) => {
    if (link.type === "link" && link.path) {
      const fileItem = findItemByPath(link.path);
      if (!fileItem) return;

      changeDirectory(fileItem.id);
      openWindow(link.app);
      setActiveMenu(null);
    }
  };

  const renderDropdown = (items: NavLinkItem[]) => (
    <div className="absolute top-full left-0 mt-1 w-48 bg-control-bg backdrop-blur-md rounded-lg shadow-xl border border-border-primary py-1 flex flex-col z-50 animate-in fade-in slide-in-from-top-2 duration-150">
      {items.map((child) => (
        <div
          key={child.id}
          className="relative group px-4 py-1.5 hover:bg-primary hover:text-text-primary cursor-pointer text-sm flex justify-start items-center gap-3 rounded-md"
          onClick={(e) => {
            e.stopPropagation();
            if (child.type === "link") handleNavLink(child);
          }}
        >
          {child.icon && (
            <img src={child.icon} alt={child.name} className="size-4" />
          )}
          {child.name}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {(activeMenu || showControlCenter) && (
        <div className="fixed inset-0 z-40" onClick={handleOutsideClick} />
      )}

      <nav className="relative z-50 flex justify-between items-center bg-menubar-bg text-text-primary backdrop-blur-xl h-9 px-4 select-none text-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() =>
                setActiveMenu(activeMenu === "system" ? null : "system")
              }
              className={`text-lg hover:bg-menubar-hover px-2 rounded ${activeMenu === "system" ? "bg-menubar-active" : ""}`}
            >
              
            </button>

            {activeMenu === "system" && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-control-bg backdrop-blur-xl rounded-lg shadow-xl border border-border-primary py-1 z-50 animate-in fade-in slide-in-from-top-2">
                {navSystemDropdown.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSystemAction(item.action)}
                    className="w-full text-left px-4 py-1.5 hover:bg-primary hover:text-text-primary flex items-center gap-2 group rounded-md"
                  >
                    <item.icon
                      size={14}
                      className="opacity-50 group-hover:opacity-100"
                    />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="font-bold hidden sm:block">Michael's Portfolio</span>

          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.id} className="relative">
                <button
                  onClick={() => {
                    if (link.type === "dropdown") {
                      setActiveMenu(activeMenu === link.id ? null : link.id);
                    } else {
                      handleNavLink(link);
                    }
                  }}
                  className={cn(
                    "px-3 py-1 rounded hover:bg-menubar-hover transition-colors",
                    activeMenu === link.id && "bg-menubar-active",
                  )}
                >
                  {link.name}
                </button>

                {link.type === "dropdown" &&
                  activeMenu === link.id &&
                  renderDropdown(link.children)}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {navIcons.map((icon) => (
              <button
                key={icon.id}
                onClick={() => {
                  if (icon.action === "spotlight") setShowSpotlight(true);
                  if (icon.action === "controlcenter")
                    setShowControlCenter(!showControlCenter);
                }}
                className="opacity-80 hover:opacity-100 transition-opacity active:scale-95"
              >
                <icon.icon
                  className="size-4 text-text-primary"
                  strokeWidth={3}
                />
              </button>
            ))}
          </div>

          <Clock />
        </div>

        <ControlCenter isOpen={showControlCenter} />
        <Spotlight
          isOpen={showSpotlight}
          onClose={() => setShowSpotlight(false)}
        />
      </nav>
    </>
  );
}
