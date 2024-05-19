import Button from "@/components/Button";
import useMovies from "@/hooks/useMovies";
import AppLayout from "@/layouts/AppLayout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Home() {
  const { movies, isLoading } = useMovies()

  const handleClearClickedMovies = () => {
    localStorage.removeItem('clicked_movies');
  }

  return (
    <AppLayout>
      <h2 className="mb-5 text-xl font-medium">Movies</h2>

      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:md:grid-cols-6">
        {movies && !isLoading ? (
          movies.map((movie) => {
            const movieId = movie.url.split('films/')[1].replace('/', '')

            return (
              <div>
                <div className="aspect-[1/1.4] relative">
                  <Link href={`/movies/${movieId}`}>
                    <Image height={500} width={500}  className="object-cover" src={`/assets/images/movies/${movieId}.jpg`} alt={movie.title} />
                  </Link>
                </div>

                <div className="bg-neutral-800 p-5">
                  <Link href={`/movies/${movieId}`} className="mb-5 block">{movie.title}</Link>

                  <Button href={`/movies/${movieId}`}>Read more</Button>
                </div>
              </div>
            )
          })
        ) : (
          [...Array(6)].map((element, itemIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="bg-neutral-800 aspect-[1/1.8]"></div>
          ))
        )}
      </div>

      <button
        className="text-sm uppercase tracking-wider font-bold mt-20"
        onClick={handleClearClickedMovies}
      >
        Clear clicked movies
      </button>
    </AppLayout>
  );
}
