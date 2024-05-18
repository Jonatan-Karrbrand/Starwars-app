import Image from "next/image";
import { Inter } from "next/font/google";
import { GetStaticPaths, GetStaticProps } from "next";
import starWarsClient from "@/clients/starWarsClient";
import { Movie, Movies } from "@/types/movies";

type Props = {
  movie?: Movie
}

export default function Movie({ movie } : Props) {
  return (
    <main>
      {movie?.title}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, locale }) => {
  const result = await starWarsClient<Movies>({
    endpoint: `/films/${params?.slug}`
  })

  return {
    props: {
      movie: result.data ? result.data : undefined
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
  }) :[]

  return {
    paths,
    fallback: 'blocking',
  };
};