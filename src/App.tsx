import { useState } from 'react';

import { Breeds } from './components/Breeds';
import { Simulator } from './components/Simulator';
import { History } from './components/History';
import { useSimulatorHistory } from './components/useSimulatorHistory';
import { useSimulatorBreeds } from './components/useSimulatorBreeds';

type Theme = 'default' | 'portal' | 'sixties';

export function App() {
  const [theme, setTheme] = useState<Theme>('default');
  const { rounds, addRound, wipeRounds } = useSimulatorHistory();
  const { simTargetBreeds, removeBreed, addBreed } = useSimulatorBreeds();

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

      <div className="space-between">
        <label htmlFor="theme">
          <span>Select theme: </span>
          <select
            id="theme"
            onChange={(e) => {
              setTheme(e.target.value as Theme);
            }}
          >
            <option value="default">Default</option>
            <option value="portal">Portal 2 Light</option>
            <option value="sixties">1960's</option>
          </select>
        </label>
        <small>
          All background, font, and image assets belong to Dragon Cave.
        </small>
      </div>

      <Breeds addBreed={addBreed} removeBreed={removeBreed} />

      {simTargetBreeds.length < 1 && (
        <p>
          <b>You need at least one breed selected to play the simulator.</b>
        </p>
      )}

      <Simulator breeds={simTargetBreeds} theme={theme} addRound={addRound} />

      <History rounds={rounds} wipeRounds={wipeRounds} />
    </>
  );
}
