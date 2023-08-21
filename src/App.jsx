import Wrapper from './components/Wrapper';
import './App.css';

export default function App() {
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
      <Wrapper />
    </main>
  );
}
