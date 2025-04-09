import { useState } from 'react';

import { Simulator } from './components/Simulator';

type Theme = 'default' | 'portal' | 'sixties';

export function App() {
  const [theme, setTheme] = useState<Theme>('default');
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

      <Simulator theme={theme} />

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
      <br />
      <small>
        All background, font, and image assets belong to Dragon Cave.
      </small>
    </>
  );
}
