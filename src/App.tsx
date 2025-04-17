import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import { Settings } from './components/Settings';
import { Simulator } from './components/Simulator';
import { History } from './components/History';
import { useSimulatorHistory } from './components/useSimulatorHistory';
import { useSimulatorSettings } from './components/useSimulatorSettings';

export function App() {
  const [theme, setTheme] = useState<string>('default');
  const { rounds, addRound, wipeRounds } = useSimulatorHistory();
  const {
    simTargetBreeds,
    removeBreed,
    addBreed,
    simPositions,
    addPos,
    removePos,
  } = useSimulatorSettings();

  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width < 800) {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      )
        setTheme('mobile-dark');
      else setTheme('mobile-light');
    }
  }, []);

  return (
    <>
      <h1>Cave Catching Simulator</h1>
      <p>
        <small>
          Simulation of{' '}
          <a href="https://dragcave.net" target="__blank">
            Dragon Cave
          </a>
          's biomes to test your catching speed.
        </small>
      </p>

      <p>
        <b>How it works:</b> The simulator plays "rounds" where, among six
        biomes, a "rare" egg (Gold, Silver, or Staterae) is hiding. The round
        ends when you "catch" the rare by clicking on it. You will be shown
        statistics pertaining to each round: time elapsed in seconds, biome
        visits taken, etc.
      </p>

      <Settings
        addBreed={addBreed}
        removeBreed={removeBreed}
        addPos={addPos}
        removePos={removePos}
      />

      <div className="space-between">
        <label htmlFor="theme">
          <span>Select theme: </span>
          <select
            id="theme"
            onChange={(e) => {
              setTheme(e.target.value);
            }}
            value={theme}
          >
            {[
              { title: 'Default', value: 'default' },
              { title: 'Portal 2 Light', value: 'portal' },
              { title: '1960s', value: 'sixties' },
              { title: 'Mobile (dark)', value: 'mobile-dark' },
              { title: 'Mobile (light)', value: 'mobile-light' },
            ].map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.title}
              </option>
            ))}
          </select>
        </label>
        <small>
          All background, font, and image assets belong to Dragon Cave.
        </small>
      </div>

      {windowSize.width < 700 &&
        ['default', 'sixties', 'portal'].includes(theme) && (
          <p>
            <b>The theme you have selected may not fit on your screen.</b>
          </p>
        )}

      {simTargetBreeds.length < 1 && (
        <p>
          <b>You need at least one breed selected to play the simulator.</b>
        </p>
      )}

      {simPositions.length < 1 && (
        <p>
          <b>
            You need at least one egg spawn position selected to play the
            simulator.
          </b>
        </p>
      )}

      <Simulator
        breeds={simTargetBreeds}
        positions={simPositions}
        theme={theme}
        addRound={addRound}
      />

      <History rounds={rounds} wipeRounds={wipeRounds} />
    </>
  );
}
