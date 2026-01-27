import { SearchIcon } from "lucide-react";

import { WindowWrapper } from "../window-wrapper";
import { WindowControls } from "../window-controls";
import { useWindowStore } from "@/stores/window";

function Image() {
  const { windows } = useWindowStore();

  const data = windows.imgfile?.data;
  if (!data) return null;

  const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{name}</h2>
      </div>

      <div className="p-5 bg-white">
        {imageUrl && (
          <div className="w-full">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-auto max-h-[70vh] object-contain rounded"
            />
          </div>
        )}
      </div>
    </>
  );
}

export const ImageWindow = WindowWrapper(Image, "imgfile");
