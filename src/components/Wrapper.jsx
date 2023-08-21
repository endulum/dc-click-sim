import { useEffect, useState } from 'react';

import ReadyBar from './ReadyBar';
import Eggs from './Eggs';
import CatchMessage from './CatchMessage';

export default function Wrapper() {
  const [isSimRunning, setIsSimRunning] = useState(false);
  const [isEggCaught, setIsEggCaught] = useState(false);
  const [eggCatchTime, setEggCatchTime] = useState(null);

  let startTime = null;

  useEffect(() => {
    if (isSimRunning) {
      startTime = performance.now();
    }
  }, [isSimRunning]);

  function getTime() {
    if (startTime !== null) {
      const endTime = performance.now();
      setEggCatchTime((endTime - startTime) / 1000);
      setIsEggCaught(true);
      setIsSimRunning(false);
    }
  }

  return (
    <div
      className="wrapper"
      onMouseLeave={() => setIsSimRunning(false)}
    >
      <ReadyBar
        isSimRunning={isSimRunning}
        startSim={() => setIsSimRunning(true)}
      />
      {/* { isSimRunning && (
        <p>
          <button type="button" id="target-egg" onClick={getTime}>Catch me!</button>
        </p>
      )} */}
      <Eggs
        isSimRunning={isSimRunning}
        stopSim={() => setIsSimRunning(false)}
      />
      { isEggCaught && (
        <CatchMessage time={eggCatchTime} />
      )}
    </div>
  );
}
