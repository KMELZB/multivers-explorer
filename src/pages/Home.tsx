import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCharacters } from "../services/Api";

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

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Multivers Explorer</h1>

      <div>
        <button 
          onClick={() => setCurrentUrl(info.prev!)} 
          disabled={!info.prev}
        >
          Précédent
        </button>
        <button 
          onClick={() => setCurrentUrl(info.next!)} 
          disabled={!info.next}
        >
          Suivant
        </button>
      </div>

      <div>
        {characters.map((char: any) => (
          <div key={char.id}>
            <img src={char.image} alt={char.name} width="100" />
            <h3>{char.name}</h3>
            <p>{char.species}</p>
            <Link to={`/character/${char.id}`}>Voir détails</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;