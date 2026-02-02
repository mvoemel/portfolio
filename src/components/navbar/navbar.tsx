import { useEffect, useState } from "react";

import { useFinderStore } from "@/stores/finder-store";
import { useWindowStore } from "@/stores/window-store";
import { useSpotlightStore } from "@/stores/spotlight-store";
import {
  navLinks,
  navIcons,
  navSystemDropdown,
  findItemByPath,
} from "@/lib/constants";
import type { NavLinkItem } from "@/lib/types";
import { cn } from "@/lib/util";

import { Clock } from "./clock";
import { ControlCenter } from "./control-center";
import { Spotlight } from "./spotlight";

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showControlCenter, setShowControlCenter] = useState(false);

  const { toggleSpotlight, openSpotlight } = useSpotlightStore();
  const { changeDirectory } = useFinderStore();
  const { openWindow, closeAllWindows } = useWindowStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleSpotlight();
        setShowControlCenter(false);
        setActiveMenu(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSpotlight]);

  const handleOutsideClick = () => {
    setActiveMenu(null);
    setShowControlCenter(false);
  };

  const handleSystemAction = (action: string, finderPath?: string) => {
    switch (action) {
      case "finder": {
        if (!finderPath) return;

        const fileItem = findItemByPath(finderPath);
        if (!fileItem) return;

        changeDirectory(fileItem.id);
        openWindow("finder");

        break;
      }
      case "clipboard":
        navigator.clipboard.writeText(window.location.href);
        break;
      case "close":
        closeAllWindows();
        break;
      case "reload":
        window.location.reload();
        break;

      default:
        console.warn("Unknown action", action);
        break;
    }

    setActiveMenu(null);
  };

  const handleNavLink = (link: NavLinkItem) => {
    if (link.type === "dropdown") return;

    if (link.app == "finder" && link.path) {
      const fileItem = findItemByPath(link.path);
      if (!fileItem) return;

      changeDirectory(fileItem.id);
    }

    openWindow(link.app);
    setActiveMenu(null);
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

      <nav className="relative z-2000 flex justify-between items-center bg-menubar-bg text-text-primary backdrop-blur-xl h-9 px-4 select-none text-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() =>
                setActiveMenu(activeMenu === "system" ? null : "system")
              }
              className={cn(
                "text-lg hover:bg-menubar-hover px-2 rounded hidden sm:block",
                activeMenu === "system" && "bg-menubar-active",
              )}
            >
              
            </button>

            {activeMenu === "system" && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-control-bg backdrop-blur-xl rounded-lg shadow-xl border border-border-primary py-1 z-50 animate-in fade-in slide-in-from-top-2">
                {navSystemDropdown.map((item) => (
                  <button
                    key={item.id}
                    onClick={() =>
                      handleSystemAction(item.action, item.finderPath)
                    }
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

          <span className="font-bold">Michael's Portfolio</span>

          <ul className="hidden sm:flex items-center gap-1">
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
          <div className="hidden sm:flex items-center gap-3">
            {navIcons.map((icon) => (
              <button
                key={icon.id}
                onClick={() => {
                  if (icon.action === "spotlight") openSpotlight();
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
        <Spotlight />
      </nav>
    </>
  );
}
