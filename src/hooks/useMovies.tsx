import starWarsClient from "@/clients/starWarsClient";
import { Movie, Movies } from "@/types/movies";
import { useEffect, useState } from "react";

const useMovies = () => {
  const [movies, setMovies] = useState<undefined | Movie[]>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true)

    const result = await starWarsClient<Movies>({
      endpoint: '/films'
    })

    if (result.data) {
      setMovies(result.data.results)
    }

    setIsLoading(false)
  }


  useEffect(() => {
    fetchMovies()
  }, [])

  return {
    movies,
    isLoading
  }
}

export default useMovies;