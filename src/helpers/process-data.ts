import { Character, Movie } from "@/types"

export const getCharacterId = (character: Character) => {
  return character.url.split('people/')[1].replace('/', '')
}

export const getMovieId = (movie: Movie) => {
  return movie.url.split('films/')[1].replace('/', '')
}