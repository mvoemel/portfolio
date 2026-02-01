import gsap from "gsap";
import { Draggable } from "gsap/all";

import { ThemeProvider } from "./providers/theme-provider";
import { Navbar } from "./components/navbar";
import { WelcomeText } from "./components/welcome-text";
import { Dock } from "./components/dock";
import { Desktop } from "./components/desktop";
import {
  ContactWindow,
  FinderWindow,
  MapsWindow,
  PreviewWindow,
  SafariWindow,
  TerminalWindow,
} from "./components/windows";

gsap.registerPlugin(Draggable);

// TODO: maybe rework how preview functions; possiblity to have multiple preview windows open

export default function App() {
  return (
    <ThemeProvider>
      <main className="w-dvw h-dvh overflow-hidden">
        <Navbar />
        <WelcomeText />
        <Dock />
        <Desktop />

        <FinderWindow />
        <TerminalWindow />
        <PreviewWindow />
        <SafariWindow />
        <ContactWindow />
        <MapsWindow />
      </main>
    </ThemeProvider>
  );
}
