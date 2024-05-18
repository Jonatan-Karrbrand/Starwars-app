import { GetStaticPaths, GetStaticProps } from "next";
import starWarsClient from "@/clients/starWarsClient";
import { Movie, Movies } from "@/types/movies";
import AppLayout from "@/layouts/AppLayout";

type Props = {
  movie: Movie
}

export default function Movie({ movie } : Props) {
  return (
    <AppLayout>
      <div>
        {movie?.title}
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