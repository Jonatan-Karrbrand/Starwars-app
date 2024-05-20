import starWarsClient from "@/clients/starWarsClient";
import Button from "@/components/Button";
import { getCharacterId } from "@/helpers/process-data";
import useCharacters from "@/hooks/useCharacters";
import AppLayout from "@/layouts/AppLayout";
import { Character, Characters as CharactersType } from "@/types";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  allCharacters: Character[]
}

export default function Characters({allCharacters} : Props) {
  const { characters } = useCharacters(allCharacters);

  return (
    <AppLayout>
      <h2 className="mb-5 text-xl font-medium">Characters</h2>

      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:md:grid-cols-6">
        {characters?.length > 0 && (
          characters.map((character, index) => {
            const characterId = getCharacterId(character)

            return (
              <div>
                <div className="aspect-[1/1.4] relative">
                  <Link className="flex h-full" href={`/characters/${characterId}`}>
                    <Image priority={index < 12} height={500} width={500} className="object-cover" src={`/assets/images/people/${characterId}.jpg`} alt={character.name} />
                  </Link>
                </div>

                <div className="bg-neutral-800 p-5">
                  <Link href={`/characters/${characterId}`} className="mb-5 block">{character.name}</Link>

                  <Button href={`/characters/${characterId}`}>Read more</Button>
                </div>
              </div>
            )
          })
        )}
      </div>

      <div className="mt-20 text-center">
        {characters?.length > 0 ? (
          <p>Total count: {characters.length}</p>
        ) : (
          <>
            <p className="mb-5">No clicked movies found</p>

            <Button href="/">Go to movies</Button>
          </>
        )}
        </div>
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let allCharacters:Character[] = [];
  let nextUrl:string | null = '';

  // fetch all characters serverside
  while (nextUrl !== null) {
    const nextPageId:string = nextUrl?.split('?')[1];

    const result = await starWarsClient<CharactersType>({
      endpoint: `/people${nextPageId ? `?${nextPageId}` : ''}`
    });

    if (result.data) {
      allCharacters = [...allCharacters, ...result.data.results];

      nextUrl = result.data.next;
    } else {
      return {
        notFound: true,
      };
    }
  }

  return {
    props: {
      allCharacters
    },
  };
};