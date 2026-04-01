import { useEffect, useState } from "react";
import { getCharacters } from "../services/Api";
import CharacterCard from "../components/CharacterCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState("https://rickandmortyapi.com/api/character");
  const [info, setInfo] = useState({ next: null, prev: null });

  useEffect(() => {
    setLoading(true);
    getCharacters(currentUrl)
      .then((data) => {
        setCharacters(data.results);
        setInfo(data.info);
        setError(null);
      })
      .catch(() => {
        setError("Erreur de chargement");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentUrl]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1>Multivers Explorer</h1>

      <div>
        <button onClick={() => setCurrentUrl(info.prev!)} disabled={!info.prev}>Précédent</button>
        <button onClick={() => setCurrentUrl(info.next!)} disabled={!info.next}>Suivant</button>
      </div>

      <div className="character-grid">
        {characters.map((char: any) => (
          <CharacterCard key={char.id} char={char} />
        ))}
      </div>
    </div>
  );
};

export default Home;