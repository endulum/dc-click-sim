import { useEffect, useRef } from 'react';

import MysteryEgg from '../assets/egg.gif';

import { type EndRoundStats, type Biome } from '../types';
import { useSimulatorRound } from './useSimulatorRound';
import { useHover } from 'usehooks-ts';

export function Simulator({
  breeds,
  positions,
  theme,
  addRound,
}: {
  breeds: string[];
  positions: string[];
  theme: string;
  addRound: (round: EndRoundStats) => void;
}) {
  const simulatorRef = useRef<HTMLDivElement>(null);
  const isHovering = useHover(
    simulatorRef as unknown as React.RefObject<HTMLDivElement>
    // coercing because bug: https://github.com/juliencrn/usehooks-ts/issues/681
  );

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
    selectedPositions: positions,
    handleRoundStats: (stats) => addRound(stats),
  });

  const handleRefresh = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (!roundStats.current) startGame();
    }
  };

  const addSimEvents = () => {
    document.addEventListener('keypress', handleRefresh);
    if (simulatorRef.current)
      simulatorRef.current.addEventListener('click', handleClick);
  };

  const removeSimEvents = () => {
    document.removeEventListener('keypress', handleRefresh);
    if (simulatorRef.current)
      simulatorRef.current.removeEventListener('click', handleClick);
  };

  useEffect(() => {
    if (isHovering) {
      if (document.activeElement) {
        (document.activeElement as HTMLElement).blur();
      }
      addSimEvents();
    } else {
      removeSimEvents();
    }
    return () => {
      removeSimEvents();
    };
  }, [breeds, isHovering]);

  return (
    <div
      className={`simulator ${theme}${
        breeds.length < 1 || positions.length < 1 ? ' disabled' : ''
      }`}
      ref={simulatorRef}
      {...((breeds.length < 1 || positions.length < 1) && { inert: true })}
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
                    <a href="#egg" tabIndex={-1}>
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
            Find the <b>{roundStats.current.breed}</b> egg!
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
            </a>
            , or hitting the spacebar (while hovering over this window).
          </p>
        )}
      </div>
    </div>
  );
}
