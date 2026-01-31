import gsap from "gsap";
import { Draggable } from "gsap/all";

import { Navbar } from "./components/navbar";
import { WelcomeText } from "./components/welcome-text";
import { ThemeProvider } from "./providers/theme-provider";
import { Dock } from "./components/dock";
import { Desktop } from "./components/desktop";
import {
  FinderWindow,
  PreviewWindow,
  TerminalWindow,
} from "./components/windows";

gsap.registerPlugin(Draggable);

// TODO: implement:
// SafariWindow
// MapsWindow
// ContactsWindow

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
        {/* <SafariWindow /> */}
        {/* <ContactWindow /> */}
      </main>
    </ThemeProvider>
  );
}
