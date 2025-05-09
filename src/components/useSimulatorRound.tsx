import { useRef, useState } from 'react';

import {
  type Egg,
  type Biome,
  type RoundStats,
  type EndRoundStats,
} from '../types';
import { generateAllEggs } from '../eggs/eggUtils';

export function useSimulatorRound({
  selectedBreeds,
  selectedPositions,
  handleRoundStats,
}: {
  selectedBreeds: string[];
  selectedPositions: string[];
  handleRoundStats: (roundStats: EndRoundStats) => void;
}) {
  // what biome are we viewing right now?
  const [biome, setBiome] = useState<Biome>('alpine');

  // what eggs are in the biomes?
  const [eggs, setEggs] = useState<Partial<Record<Biome, Egg[]>> | null>(null);

  // save all roundStats to one ref
  const roundStats = useRef<null | RoundStats>(null);

  const handleBiomeChange = (nextBiome: Biome) => {
    if (roundStats.current) {
      roundStats.current.visits++;
      if (roundStats.current.location === biome) roundStats.current.skips++;
    }
    setBiome(nextBiome);
  };

  const handleEggCatch = (egg: Egg) => {
    if (roundStats.current) {
      if (roundStats.current.breed !== egg.breed)
        roundStats.current.misclicks++;
      else endGame();
    }
  };

  const handleClick = (e: MouseEvent) => {
    if (roundStats.current) {
      if (!(e.target as Element).closest('a')) roundStats.current.misclicks++;
    }
  };

  function startGame() {
    const generatedEggs = generateAllEggs(selectedBreeds, selectedPositions);
    setEggs(generatedEggs.eggs);
    roundStats.current = {
      ...generatedEggs.target,
      start: performance.now(),
      visits: 0,
      skips: 0,
      misclicks: 0,
    };
  }

  function endGame() {
    if (roundStats.current)
      handleRoundStats({
        ...roundStats.current,
        time: Math.round(performance.now() - roundStats.current.start),
      });
    setEggs(null);
    roundStats.current = null;
  }

  return {
    biome,
    eggs,
    roundStats,
    handleBiomeChange,
    handleEggCatch,
    handleClick,
    startGame,
  };
}
