import { useEffect, useRef } from 'react';

import MysteryEgg from '../assets/egg.gif';

import { type EndRoundStats, type Biome } from '../types';
import { useSimulatorRound } from './useSimulatorRound';

export function Simulator({
  breeds,
  theme,
  addRound,
}: {
  breeds: string[];
  theme: string;
  addRound: (round: EndRoundStats) => void;
}) {
  const simulatorRef = useRef<HTMLDivElement>(null);

  const {
    biome,
    eggs,
    roundStats,
    handleBiomeChange,
    handleClick,
    handleEggCatch,
    startGame,
  } = useSimulatorRound({
    selectedBreeds: breeds,
    handleRoundStats: (stats) => addRound(stats),
  });

  const handleRefresh = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (!roundStats.current) startGame();
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', handleRefresh);
    if (simulatorRef.current)
      simulatorRef.current.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('keypress', handleRefresh);
      if (simulatorRef.current)
        simulatorRef.current.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      className={`simulator ${theme}${breeds.length < 1 ? ' disabled' : ''}`}
      ref={simulatorRef}
    >
      {/* biome header */}
      <h1>{biome[0].toUpperCase() + biome.substring(1)}</h1>

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

      {/* game status message */}
      <div className="simulator-status">
        {roundStats.current ? (
          <p>
            Find the <b>{roundStats.current.rareEgg.breed}</b> egg!
          </p>
        ) : (
          <p>
            Start the round by{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                startGame();
              }}
            >
              clicking here
            </a>{' '}
            or hitting the spacebar.
          </p>
        )}
      </div>
    </div>
  );
}
