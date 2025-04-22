import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

// import { Settings } from './components/Settings';
import { Simulator } from './components/Simulator';
import { History } from './components/History';
import { useSimulatorHistory } from './components/useSimulatorHistory';
import { useSimulatorSettings } from './components/useSimulatorSettings';
import { Listbox } from './components/Listbox';

import { rareBreeds } from './eggs/eggUtils';

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
  const [hideBreed, setHideBreed] = useState(false);

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
        hideBreed={hideBreed}
      />

      <History rounds={rounds} wipeRounds={wipeRounds} />

      <h2>Simulator Settings</h2>
      <div className="settings">
        <label htmlFor="breeds">Breeds to simulate</label>
        <Listbox
          id="breeds"
          values={simTargetBreeds}
          allValues={rareBreeds}
          addValue={addBreed}
          removeValue={removeBreed}
        />

        <label htmlFor="positions">Egg spawn positions</label>
        <Listbox
          id="positions"
          values={simPositions}
          allValues={['left', 'middle', 'right']}
          addValue={addPos}
          removeValue={removePos}
        />

        <label htmlFor="theme">Select theme</label>
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

        <label htmlFor="hideBreed">Hide target breed name</label>
        <input
          type="checkbox"
          id="hideBreed"
          checked={hideBreed}
          onChange={(e) => {
            setHideBreed(e.target.checked);
          }}
        />
      </div>
    </>
  );
}
