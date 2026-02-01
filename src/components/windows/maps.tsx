import { useMemo, useState, useRef } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { PlusIcon, MinusIcon } from "lucide-react";

import { visitedCountries } from "@/lib/constants";
import type { GeoFeatureCollection } from "@/lib/types";

import { WindowWrapper } from "./window-wrapper";
import { WindowControls } from "./window-controls";

import worldDataRaw from "@/assets/world.json?raw";
const worldData = JSON.parse(worldDataRaw);

function Maps() {
  const [transform, setTransform] = useState({ k: 1, x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  const { paths } = useMemo(() => {
    const proj = geoMercator().scale(100).translate([400, 250]);
    const pathGenerator = geoPath().projection(proj);

    const data = worldData as unknown as GeoFeatureCollection;

    const shapes = data.features.map((feature) => {
      const name = feature.properties.name;
      const isVisited = visitedCountries.includes(name);

      return {
        path: pathGenerator(feature) || "",
        id: feature.id,
        name,
        isVisited,
      };
    });

    return { paths: shapes };
  }, []);

  const applyZoom = (scaleFactor: number, pivotX: number, pivotY: number) => {
    setTransform((prev) => {
      const newK = Math.max(0.5, Math.min(8, prev.k * scaleFactor));
      const ratio = newK / prev.k;

      const newX = pivotX - (pivotX - prev.x) * ratio;
      const newY = pivotY - (pivotY - prev.y) * ratio;

      return { k: newK, x: newX, y: newY };
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;

    const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;

    applyZoom(scaleFactor, cursorX, cursorY);
  };

  const handleButtonZoom = (direction: "in" | "out") => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const factor = direction === "in" ? 1.2 : 0.8;

    applyZoom(factor, centerX, centerY);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    setTransform((p) => ({ ...p, x: p.x + dx, y: p.y + dy }));
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => setDragging(false);

  return (
    <div className="flex flex-col h-full w-full bg-bg-tertiary">
      <div className="window-header shrink-0 h-12 flex items-center backdrop-blur-md z-10">
        <WindowControls target="maps" />
        <div className="absolute left-1/2 -translate-x-1/2 font-semibold text-text-secondary">
          Countries Visited
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-hidden relative bg-bg-primary cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full"
          style={{ touchAction: "none" }}
        >
          <g
            transform={`translate(${transform.x}, ${transform.y}) scale(${transform.k})`}
          >
            {paths.map((shape) => (
              <path
                key={shape.id || shape.name}
                d={shape.path}
                fill={shape.isVisited ? "#3b82f6" : "#D6D6DA"}
                stroke="#FFFFFF"
                strokeWidth={0.5 / transform.k}
                className="transition-colors duration-200 hover:brightness-95"
              />
            ))}
          </g>
        </svg>

        <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
          <button
            onClick={() => handleButtonZoom("in")}
            className="w-10 h-10 bg-bg-primary/80 backdrop-blur shadow-lg rounded-full flex items-center justify-center text-text-secondary hover:text-primary hover:scale-110 transition-all active:scale-95"
          >
            <PlusIcon size={20} />
          </button>
          <button
            onClick={() => handleButtonZoom("out")}
            className="w-10 h-10 bg-bg-primary/80 backdrop-blur shadow-lg rounded-full flex items-center justify-center text-text-secondary hover:text-primary hover:scale-110 transition-all active:scale-95"
          >
            <MinusIcon size={20} />
          </button>
        </div>

        <div className="absolute bottom-6 left-6 bg-bg-primary/80 backdrop-blur px-4 py-2 rounded-full text-xs font-medium text-text-secondary shadow-sm pointer-events-none select-none border border-black/5">
          {paths.filter((p) => p.isVisited).length} Countries Visited
        </div>
      </div>
    </div>
  );
}

export const MapsWindow = WindowWrapper(
  Maps,
  "maps",
  "w-[50rem] h-[30rem] absolute left-[10vw] top-[10vh] bg-bg-primary rounded-xl shadow-2xl drop-shadow-2xl overflow-hidden border border-black/5 dark:border-white/5",
);
