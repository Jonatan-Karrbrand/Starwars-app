import Button from "@/components/Button";
import useCharacters from "@/hooks/useCharacters";
import AppLayout from "@/layouts/AppLayout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Characters() {
  const { characters, isLoading } = useCharacters();

  return (
    <AppLayout>
      <h2 className="mb-5 text-xl font-medium">Characters</h2>

      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:md:grid-cols-6">
        {characters?.length > 0 && !isLoading && (
          characters.map((character) => {
            const characterId = character.url.split('people/')[1].replace('/', '')

            return (
              <div>
                <div className="aspect-[1/1.4] relative">
                  <Link href={`/characters/${characterId}`}>
                    <Image height={500} width={500} className="object-cover" src={`/assets/images/people/${characterId}.jpg`} alt={character.name} />
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

        {isLoading && (
        (
          [...Array(12)].map((element, itemIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="bg-neutral-800 aspect-[1/1.8]"></div>
          ))
        )
        )}
      </div>

      <div className="mt-20 text-center">
        {characters?.length > 0 && !isLoading && (
          <p>Total count: {characters.length}</p>
        )}

        {characters?.length === 0 && !isLoading && (
          <>
            <p className="mb-5">No clicked movies found</p>

            <Button href="/">Go to movies</Button>
          </>
        )}
        </div>
    </AppLayout>
  );
}
