import { lazy, Suspense } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";

import { ThemeProvider } from "./providers/theme-provider";
import { Navbar } from "./components/navbar";
import { WelcomeText } from "./components/welcome-text";
import { Dock } from "./components/dock";
import { Desktop } from "./components/desktop";
import { Debug } from "./components/debug";

const FinderWindow = lazy(() =>
  import("./components/windows/finder").then((m) => ({ default: m.FinderWindow }))
);
const TerminalWindow = lazy(() =>
  import("./components/windows/terminal").then((m) => ({ default: m.TerminalWindow }))
);
const PreviewWindow = lazy(() =>
  import("./components/windows/preview").then((m) => ({ default: m.PreviewWindow }))
);
const SafariWindow = lazy(() =>
  import("./components/windows/safari").then((m) => ({ default: m.SafariWindow }))
);
const ContactWindow = lazy(() =>
  import("./components/windows/contact").then((m) => ({ default: m.ContactWindow }))
);
const MapsWindow = lazy(() =>
  import("./components/windows/maps").then((m) => ({ default: m.MapsWindow }))
);

gsap.registerPlugin(Draggable);

export default function App() {
  return (
    <ThemeProvider>
      <main className="w-dvw h-dvh overflow-hidden">
        <Navbar />
        <WelcomeText />
        <Dock />
        <Desktop />

        <Suspense fallback={null}>
          <FinderWindow />
          <TerminalWindow />
          <PreviewWindow />
          <SafariWindow />
          <ContactWindow />
          <MapsWindow />
        </Suspense>

        {import.meta.env.DEV && <Debug />}
      </main>
    </ThemeProvider>
  );
}
