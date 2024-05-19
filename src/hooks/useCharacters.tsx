import starWarsClient from "@/clients/starWarsClient";
import characters from "@/pages/characters";
import { Character, Characters } from "@/types";
import { useEffect, useState } from "react";

const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCharacters = async () => {
    try {
      setIsLoading(true);

      let allCharacters:Character[] = [];
      let nextUrl:string | null = '';

      while (nextUrl !== null) {
        const nextPageId:string = nextUrl?.split('?')[1]

        const result = await starWarsClient<Characters>({
          endpoint: `/people${nextPageId ? `?${nextPageId}` : ''}`
        })

        if (result.data) {
          allCharacters = [...allCharacters, ...result.data.results];

          nextUrl = result.data.next;
        }
      }

      const clickedMoviesLocalStorage = localStorage.getItem('clicked_movies') ?? '';

      if (!clickedMoviesLocalStorage) {
        setIsLoading(false);

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
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error, 'error')
    }
  }

  useEffect(() => {
    fetchCharacters()
  }, [])

  return {
    characters,
    isLoading
  }
}

export default useCharacters;