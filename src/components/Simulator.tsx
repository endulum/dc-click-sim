import { useState } from 'react';

import Egg from '../assets/egg.gif';

type Biome = 'alpine' | 'coast' | 'desert' | 'forest' | 'jungle' | 'volcano';

export function Simulator({ theme }: { theme: string }) {
  const [currentBiome, setCurrentBiome] = useState<Biome>('alpine');

  return (
    <div className={`simulator ${theme}`}>
      {/* biome header */}
      <h1>{currentBiome[0].toUpperCase() + currentBiome.substring(1)}</h1>

      {/* biome links */}
      <ul>
        {['Alpine', 'Coast', 'Desert', 'Forest', 'Jungle', 'Volcano'].map(
          (biome) => (
            <li key={biome}>
              <a
                href={`#${biome.toLowerCase()}`}
                onClick={() => {
                  setCurrentBiome(biome.toLowerCase() as Biome);
                }}
              >
                {biome.toLowerCase() === currentBiome ? (
                  <b>{biome}</b>
                ) : (
                  <span>{biome}</span>
                )}
              </a>
            </li>
          )
        )}
      </ul>

      {/* biome text */}
      <section>
        <p>
          You arrive at a purely hypothetical cave and see many large dragons
          scattered about, some with hatchlings. Nearby, there is a pile of
          several purely hypothetical eggs.
        </p>
        <p>
          You don’t want to disturb the dragons, but some of the eggs are far
          enough away that you could steal one. Three of the eggs catch your
          eye. Which do you take?
        </p>

        {/* eggs */}
        <div className="eggs">
          {['???', '???', '???'].map((egg) => (
            <div className="egg" key={egg}>
              <a href="#egg">
                <img src={Egg} alt="An egg." />
              </a>
              <br />
              <span>{egg}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
