import "./App.css";
import { navLinks } from "@/lib/constants";

function App() {
  return (
    <div>
      {navLinks.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
}

export default App;
