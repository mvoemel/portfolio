import gsap from "gsap";
import { Draggable } from "gsap/all";

import { Dock } from "./components/dock";
import { Navbar } from "./components/navbar";
import { Welcome } from "./components/welcome";
import { Home } from "./components/home";
import { TerminalWindow } from "./components/windows/terminal";
import { SafariWindow } from "./components/windows/safari";
import { ResumeWindow } from "./components/windows/resume";
import { FinderWindow } from "./components/windows/finder";
import { TextWindow } from "./components/windows/text";
import { ImageWindow } from "./components/windows/image";
import { ContactWindow } from "./components/windows/contact";

gsap.registerPlugin(Draggable);

export default function App() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Home />

      <TerminalWindow />
      <SafariWindow />
      <ResumeWindow />
      <FinderWindow />
      <TextWindow />
      <ImageWindow />
      <ContactWindow />
    </main>
  );
}
