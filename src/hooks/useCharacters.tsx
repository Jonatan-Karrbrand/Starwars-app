import { Character } from "@/types";
import { useEffect, useState } from "react";

const useCharacters = (allCharacters: Character[]) => {
  const [characters, setCharacters] = useState<Character[]>([]);

  const filterCharacters = () => {
    const clickedMoviesLocalStorage = localStorage.getItem('clicked_movies') ?? '';

    if (!clickedMoviesLocalStorage) {
      return;
    }

    const clickedMovies = JSON.parse(clickedMoviesLocalStorage);
    const clickedMoviesSet = new Set(clickedMovies);

    const filteredCharacters = allCharacters.filter((character) => {
      return character.films.some((movie) => {
        const movieId = movie.split('films/')[1].replace('/', '');
        return clickedMoviesSet.has(movieId);
      });
    });

    setCharacters(filteredCharacters);
  }

  useEffect(() => {
    filterCharacters();
  }, [allCharacters])

  return {
    characters,
  }
}

export default useCharacters;