import { useState } from 'react';
import { EndRoundStats } from '../types';

export function useSimulatorHistory() {
  const [rounds, setRounds] = useState<EndRoundStats[]>([]);

  const addRound = (round: EndRoundStats) => {
    setRounds([...rounds, round]);
  };

  const wipeRounds = () => {
    setRounds([]);
  };

  return { rounds, addRound, wipeRounds };
}
