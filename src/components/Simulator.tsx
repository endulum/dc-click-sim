import { useEffect } from 'react';

import MysteryEgg from '../assets/egg.gif';

import { type Biome } from '../types';
import { useSimulator } from './useSimulator';

export function Simulator({ theme }: { theme: string }) {
  const { biome, eggs, stats, handleBiomeChange, handleEggCatch, startGame } =
    useSimulator();

  const handleRefresh = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (!stats.current) startGame();
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', handleRefresh);
    return () => {
      document.removeEventListener('keypress', handleRefresh);
    };
  }, []);

  return (
    <div className={`simulator ${theme}`}>
      {/* biome header */}
      <div>
        <h1>{biome[0].toUpperCase() + biome.substring(1)}</h1>
        {eggs && stats.current ? (
          <p>
            Find the <b>{stats.current.rareEgg.breed}</b>.
          </p>
        ) : (
          <button onClick={() => startGame()}>Start</button>
        )}
      </div>

      {/* biome links */}
      <ul>
        {['Alpine', 'Coast', 'Desert', 'Forest', 'Jungle', 'Volcano'].map(
          (biomeString) => (
            <li key={biomeString}>
              <a
                href={`#${biomeString.toLowerCase()}`}
                onClick={() => {
                  handleBiomeChange(biomeString.toLowerCase() as Biome);
                }}
              >
                {biomeString.toLowerCase() === biome ? (
                  <b>{biomeString}</b>
                ) : (
                  <span>{biomeString}</span>
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
          {eggs && eggs[biome]
            ? eggs[biome].map((egg) => (
                <div className="egg" key={egg.breed}>
                  <a
                    href="#egg"
                    onClick={() => {
                      handleEggCatch(egg);
                    }}
                  >
                    <img src={MysteryEgg} alt="An egg." />
                  </a>
                  <br />
                  <span>{egg.description}</span>
                </div>
              ))
            : Array(3)
                .fill('???')
                .map((egg, index) => (
                  <div className="egg disabled" key={egg + index}>
                    <a href="#egg">
                      <img src={MysteryEgg} />
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
