import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Character from "./pages/Character";

function App() {
  return (
    <BrowserRouter>
      {/* Une barre de navigation simple qui reste partout */}
      <header style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>
        <strong>Rick & Morty Explorer</strong>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<Character />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;