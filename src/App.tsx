import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

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
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;