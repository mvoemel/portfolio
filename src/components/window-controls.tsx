import { useWindowStore } from "@/stores/window";

type WindowControlsProps = {
  target: string;
};

export function WindowControls({ target }: WindowControlsProps) {
  const { closeWindow } = useWindowStore();

  return (
    <section id="window-controls">
      <div className="close" onClick={() => closeWindow(target)} />
      <div className="minimize" />
      <div className="maximize" />
    </section>
  );
}
