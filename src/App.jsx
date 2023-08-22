/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

import Wrapper from './components/Wrapper';
import './App.css';
import './themes/Default.css';
import './themes/Sixties.css';
import './themes/PortalLight.css';

export default function App() {
  const [theme, setTheme] = useState('theme-default');
  return (
    <main>
      <p>
        <b>How To Use:</b>
        {' '}
        Hover over the top bar of the simulator window below, and remain there
        until the countdown is over. When the countdown ends, three random eggs
        will spawn, with one being a Gold, Silver, or Staterae. Click on it
        to catch it, your timing will be shown in a dialog beneath the eggs.
        You can replay the simulator indefinitely by hovering over the top bar
        again after each catch.
      </p>
      <Wrapper themeName={theme} />
      <div className="select">
        <label htmlFor="select-theme">Theme: </label>
        <select
          id="select-theme"
          onInput={(e) => {
            setTheme(e.target.value);
          }}
        >
          <option value="theme-default">Default</option>
          <option value="theme-portalLight">Portal 2 Light</option>
          <option value="theme-sixties">1960s</option>
        </select>
      </div>

    </main>
  );
}
