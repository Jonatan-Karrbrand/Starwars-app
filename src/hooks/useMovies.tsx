import starWarsClient from "@/clients/starWarsClient";
import { Movie, Movies } from "@/types";
import { useEffect, useState } from "react";

const useMovies = () => {
  const [movies, setMovies] = useState<undefined | Movie[]>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      setIsLoading(true)

      const result = await starWarsClient<Movies>({
        endpoint: '/films'
      })

      if (result.data) {
        setMovies(result.data.results)
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error, 'error')
    }
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