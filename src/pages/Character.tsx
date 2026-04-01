import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCharacterById } from "../services/Api";

const Character = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getCharacterById(id)
        .then((data) => {
          setCharacter(data);
          setError(null);
        })
        .catch(() => {
          setError("Personnage introuvable");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!character) return null;

  return (
    <div>
        <div>
        <Link to="/">Retour à la liste</Link>
      </div>

      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} width="200" />
      
      <ul>
        <li>Statut : {character.status}</li>
        <li>Espèce : {character.species}</li>
        <li>Origine : {character.origin?.name}</li>
      </ul>

      <hr />
      
      <h3>Évaluer ce personnage</h3>
    </div>
  );
};

export default Character;