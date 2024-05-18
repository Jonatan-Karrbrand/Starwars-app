import Image from "next/image";
import { Roboto } from "next/font/google";
import useMovies from "@/hooks/useMovies";
import Link from "next/link";

const roboto = Roboto({ subsets: ["cyrillic"], weight: "400" });

export default function Home() {
  const { movies } = useMovies()

  return (
    <main className={(`max-w-7xl mx-auto px-5 py-20 ${roboto.className}`)}>
      <h1 className="mb-5">Starwars App</h1>

      <div className="grid grid-cols-4 gap-2">
        {movies && (
          movies.map((movie) => {
            const movieId = movie.url.split('films/')[1].replace('/', '')

            return (
              <div className="bg-slate-700 p-5">
                <p>{movie.title}</p>

                <Link href={`/movies/${movieId}`}>Link</Link>
              </div>
            )
          }
          )
        )}
      </div>
    </main>
  );
}
