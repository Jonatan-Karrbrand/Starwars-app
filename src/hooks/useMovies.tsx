import starWarsClient from "@/clients/starWarsClient";
import { Movie, Movies } from "@/types/movies";
import { useEffect, useState } from "react";

const useMovies = () => {
  const [movies, setMovies] = useState<undefined | Movie[]>(undefined);

  const fetchMovies = async () => {
    const result = await starWarsClient<Movies>({
      endpoint: '/films'
    })

    if (result.data) {
      setMovies(result.data.results)
    }
  }


  useEffect(() => {
    fetchMovies()
  }, [])

  return {
    movies
  }
}

export default useMovies;