import { GetStaticPaths, GetStaticProps } from "next";
import starWarsClient from "@/clients/starWarsClient";
import { Character, Characters, Movie, Movies } from "@/types";
import AppLayout from "@/layouts/AppLayout";
import Image from "next/image";
import { useEffect } from "react";

type Props = {
  character: Character
}

export default function Character({ character } : Props) {
  const characterId = character.url.split('people/')[1].replace('/', '')

  return (
    <AppLayout>
      <div className="flex flex-col gap-12 max-w-5xl mx-auto  md:flex-row">
        <div className="aspect-[1/1.4] relative md:w-1/3">
          <Image priority className="object-cover" src={`/assets/images/people/${characterId}.jpg`} fill alt={character.name} />
        </div>

        <div className="space-y-5 md:w-2/3">
          <h1 className="text-xl font-medium">{character.name}</h1>

          <ul>
            <li>Birth year: {character.birth_year}</li>

            <li>Eye color: {character.eye_color}</li>

            <li>Gender: {character.gender}</li>

            <li>Hair color: {character.hair_color}</li>

            <li>Height: {character.height}</li>

            <li>Mass: {character.mass}</li>

            <li>Skin color: {character.skin_color}</li>
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false, locale }) => {
  const result = await starWarsClient<Movies>({
    endpoint: `/people/${params?.slug}`
  })

  if (!result.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      character: result.data
    },
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  let allCharacters:Character[] = [];
  let nextUrl:string | null = '';

  while (nextUrl !== null) {
    const nextPageId:string = nextUrl?.split('?')[1]

    const result = await starWarsClient<Characters>({
      endpoint: `/people${nextPageId ? `?${nextPageId}` : ''}`
    })

    if (result.data) {
      allCharacters = [...allCharacters, ...result.data.results];

      nextUrl = result.data.next;
    }
  }

  const paths = allCharacters ? allCharacters.map((character) => {
    const characterId = character.url.split('people/')[1].replace('/', '')

    return `/characters/${characterId}`
  }) : []

  return {
    paths,
    fallback: false,
  };
};