const BASE_URL = "https://rickandmortyapi.com/api/character";

export async function getCharacters(url = BASE_URL) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erreur API");
  }
  return response.json();
}

export async function getCharacterById(id: string) {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Personnage introuvable");
  }
  return response.json();
}