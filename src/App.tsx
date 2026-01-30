import gsap from "gsap";
import { Draggable } from "gsap/all";

import { Navbar } from "./components/navbar";
import { WelcomeText } from "./components/welcome-text";
import { ThemeProvider } from "./providers/theme-provider";
import { Dock } from "./components/dock";
import { Desktop } from "./components/desktop";
import { FinderWindow } from "./components/windows";
// import { TerminalWindow } from "./components/windows/terminal";
// import { SafariWindow } from "./components/windows/safari";
// import { ResumeWindow } from "./components/windows/resume";
// import { TextWindow } from "./components/windows/text";
// import { ImageWindow } from "./components/windows/image";
// import { ContactWindow } from "./components/windows/contact";

gsap.registerPlugin(Draggable);

// TODO: refactor; it should have the following components:
// Navbar
// WelcomeText
// Dock
// DesktopItems
// FinderWindow
// SafariWindow
// MapsWindow
// ContactsWindow
// TerminalWindow
// PreviewWindow

export default function App() {
  return (
    <ThemeProvider>
      <main className="w-dvw h-dvh overflow-hidden">
        <Navbar />
        <WelcomeText />
        <Dock />
        <Desktop />

        <FinderWindow />
        {/* <TerminalWindow /> */}
        {/* <SafariWindow /> */}
        {/* <ResumeWindow /> */}
        {/* <TextWindow /> */}
        {/* <ImageWindow /> */}
        {/* <ContactWindow /> */}
      </main>
    </ThemeProvider>
  );
}
