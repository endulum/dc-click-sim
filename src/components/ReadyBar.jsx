import { useEffect, useState } from 'react';

export default function ReadyBar({ isSimRunning, startSim, breedToCatch }) {
  const [isCounting, setIsCounting] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // console.log(isSimRunning ? 'Sim is running.' : 'Sim is NOT running.');
    if (!isSimRunning) {
      setIsCounting(false);
      setCount(0);
    }
  }, [isSimRunning]);

  useEffect(() => {
    // console.log(`Count is ${count}, Counting is ${isCounting}`);

    if (count === 3) {
      setIsCounting(false);
      startSim();
    }

    let interval;
    if (isCounting) { interval = setInterval(() => setCount(count + 1), 1000); }
    return () => clearInterval(interval);
  }, [count, isCounting]);

  return (
    <div
      className="readybar"
      onMouseEnter={() => {
        if (count < 3) {
          setIsCounting(true);
        }
      }}
      onMouseLeave={() => {
        if (isCounting) {
          setIsCounting(false);
          setCount(0);
        }
      }}
    >
      { !isCounting && count === 0 && (
        <p>Hover over here to start.</p>
      ) }
      { isCounting && count < 3 && (
        <p>
          Spawning eggs in
          {' '}
          {3 - count}
          ...
        </p>
      ) }
      { !isCounting && count === 3 && (
        <p>
          Catch the
          {' '}
          <b>{breedToCatch}</b>
          {' '}
          egg!
        </p>
      )}
    </div>
  );
}
