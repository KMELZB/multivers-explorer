import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import CharacterPage from "./pages/Character";

function App() {
  return (
    <BrowserRouter>
      {/* Une barre de navigation simple qui reste partout */}
      <header style={{ padding: "1rem", borderBottom: "1px solid var(--border)" }}>
        <strong>Rick & Morty Explorer</strong>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character/:id" element={<CharacterPage />} />
          {/* Route par défaut (404) */}
          <Route path="*" element={<h2>404 - Perdu dans le Multivers</h2>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;