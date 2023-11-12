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
import { StarsCanvas /*, RippleCanvas*/ } from "./components/canvas";

// TODO: implement RippleCanvas
// TODO: implement Testimonials

// TODO: Experience - Some Examples of my Work, Projects - Some of my Work
// -> change to better naming for Experience and Projects

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="relative z-0 bg-primary">
              <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                <Navbar />
                <Hero />
                {/* <RippleCanvas /> */}
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
    </BrowserRouter>
  );
};

export default App;
