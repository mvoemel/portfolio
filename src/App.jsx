import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  // Testimonials,
  Footer,
  Hero,
  Navbar,
  NotFound,
  Tech,
  Projects,
} from "./components";
import { StarsCanvas } from "./components/canvas";
import ModalProvider from "./providers/ModalProvider";
import { BackgroundBeams } from "./components/BackgroundBeams";

// TODO: restructure Folder structure to be more modular

// TODO: implement Testimonials

// BUG: on mobile IOS Technologies Section does not get displayed (tested with Safari and Brave)
// because of SectionWrapper, as soon as the SectionWrapper is commented out in Tech it works

const App = () => {
  return (
    <BrowserRouter>
      <ModalProvider>
        <Routes>
          <Route
            path="/"
            element={
              <div className="relative z-0 bg-primary">
                <div className="h-full w-full">
                  <BackgroundBeams />
                  <Navbar />
                  <Hero />
                </div>
                <About />
                <Experience />
                <Tech />
                <Projects />
                {/* <Testimonials /> */}
                <div className="relative z-0">
                  <Contact />
                  <StarsCanvas />
                </div>
                <Footer />
              </div>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  );
};

export default App;
