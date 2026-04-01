import { Link } from "react-router-dom";

const CharacterCard = ({ char }: { char: any }) => {
  return (
    <div className="character-card">
      <img src={char.image} alt={char.name} width="100" />
      <h3>{char.name}</h3>
      <p>{char.species}</p>
      <Link to={`/character/${char.id}`}>Voir détails</Link>
    </div>
  );
};

export default CharacterCard;