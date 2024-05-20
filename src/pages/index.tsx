import starWarsClient from "@/clients/starWarsClient";
import Button from "@/components/Button";
import { getMovieId } from "@/helpers/process-data";
import AppLayout from "@/layouts/AppLayout";
import { Movie, Movies } from "@/types";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  movies: Movie[]
}

export default function Home({ movies }: Props) {
  const [moviesCleared, setMoviesCleared] = useState(false);

  const handleClearClickedMovies = () => {
    localStorage.removeItem('clicked_movies');
    setMoviesCleared(true);
  }

  return (
    <AppLayout>
      <h2 className="mb-5 text-xl font-medium">Movies</h2>

      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:md:grid-cols-6">
        {movies.map((movie) => {
          const movieId = getMovieId(movie);

          return (
            <div>
              <div className="aspect-[1/1.4] relative">
                <Link className="flex h-full" href={`/movies/${movieId}`}>
                  <Image height={500} width={500}  className="object-cover" src={`/assets/images/movies/${movieId}.jpg`} alt={movie.title} />
                </Link>
              </div>

              <div className="bg-neutral-800 p-5">
                <Link href={`/movies/${movieId}`} className="mb-5 block">{movie.title}</Link>

                <Button href={`/movies/${movieId}`}>Read more</Button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-20">
        {moviesCleared ? (
          <p>Movies are cleared</p>
        ) : (
          <button
            className="text-sm uppercase tracking-wider font-bold"
            onClick={handleClearClickedMovies}
          >
            Clear clicked movies
          </button>
        )}
      </div>
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // fetch all movies
  const result = await starWarsClient<Movies>({
    endpoint: '/films'
  });

  if (!result.data) {
    return {
      notFound: true,
    };
  };

  return {
    props: {
      movies: result.data.results
    },
  };
};