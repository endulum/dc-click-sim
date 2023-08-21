import { useState } from 'react';

import ReadyBar from './ReadyBar';

export default function Wrapper() {
  const [isSimRunning, setIsSimRunning] = useState(false);

  return (
    <div
      className="wrapper"
      onMouseLeave={() => setIsSimRunning(false)}
    >
      <ReadyBar
        isSimRunning={isSimRunning}
        startSim={() => setIsSimRunning(true)}
      />
    </div>
  );
}
