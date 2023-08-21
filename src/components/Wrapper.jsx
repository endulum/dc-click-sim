import { useEffect, useState } from 'react';

import ReadyBar from './ReadyBar';
import Eggs from './Eggs';
import CatchMessage from './CatchMessage';
import getDescriptions from './EggData';

export default function Wrapper() {
  const [isSimRunning, setIsSimRunning] = useState(false);
  const [isEggCaught, setIsEggCaught] = useState(false);
  const [eggCatchTime, setEggCatchTime] = useState(null);
  const [caughtBreed, setCaughtBreed] = useState(null);

  const descriptions = getDescriptions();
  const breedToCatch = descriptions.find((description) => description.breed !== 'Common').breed;

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
        breedToCatch={breedToCatch}
      />
      {/* { isSimRunning && (
        <p>
          <button type="button" id="target-egg" onClick={getTime}>Catch me!</button>
        </p>
      )} */}
      <Eggs
        isSimRunning={isSimRunning}
        stopSim={() => getTime()}
        catchEgg={() => setIsEggCaught(true)}
        setCaughtBreed={setCaughtBreed}
        eggDescriptions={descriptions}
      />
      { isEggCaught && (
        <CatchMessage time={eggCatchTime} caughtBreed={caughtBreed} />
      )}
    </div>
  );
}
