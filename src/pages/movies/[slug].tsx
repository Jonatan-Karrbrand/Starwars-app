import { GetStaticPaths, GetStaticProps } from "next";
import starWarsClient from "@/clients/starWarsClient";
import { Movie, Movies } from "@/types";
import AppLayout from "@/layouts/AppLayout";
import Image from "next/image";
import { useEffect } from "react";

type Props = {
  movie: Movie
}

export default function Movie({ movie } : Props) {
  const movieId = movie.url.split('films/')[1].replace('/', '')

  const setLocalStorage = (value: string[]) => {
    localStorage.setItem('clicked_movies', JSON.stringify(value));
  }

  useEffect(() => {
    const clickedMoviesLocalStorage = localStorage.getItem('clicked_movies');

    if (!clickedMoviesLocalStorage) {
      setLocalStorage([movieId])

      return;
    }

    const clickedMovies = JSON.parse(clickedMoviesLocalStorage);
    const isMovieInLocalStorage = clickedMovies.find((movie: string) => movie === movieId)

    if (!isMovieInLocalStorage) {
      const mergedMovies = [...clickedMovies, movieId]

      setLocalStorage(mergedMovies)
    }
  }, [])

  return (
    <AppLayout>
      <div className="flex flex-col gap-12 max-w-5xl mx-auto  md:flex-row">
        <div className="aspect-[1/1.4] relative md:w-1/3">
          <Image priority className="object-cover" src={`/assets/images/movies/${movieId}.jpg`} fill alt={movie.title} />
        </div>

        <div className="space-y-5 md:w-2/3">
          <h1 className="text-xl font-medium">{movie?.title}</h1>

          <ul>
            <li>Release date: {movie.release_date}</li>

            <li>Producer: {movie.producer}</li>

            <li>Director: {movie.director}</li>
          </ul>

          <p className="">{movie.opening_crawl}</p>
        </div>
      </div>
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, locale }) => {
  const result = await starWarsClient<Movies>({
    endpoint: `/films/${params?.slug}`
  })

  if (!result.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie: result.data
    },
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const result = await starWarsClient<Movies>({
    endpoint:'/films'
  })

  const paths = result.data ? result.data.results.map((movie) => {
    const movieId = movie.url.split('films/')[1].replace('/', '')

    return `/movies/${movieId}`
  }) : []

  return {
    paths,
    fallback: false,
  };
};