import { useRef, useState, type MouseEvent } from 'react';

import { Egg, type Biome } from '../types';
import { generateBiomeEggs } from '../eggUtils';

export function useSimulator() {
  // what biome are we viewing right now?
  const [biome, setBiome] = useState<Biome>('alpine');

  // what eggs are in the biomes?
  const [eggs, setEggs] = useState<Partial<Record<Biome, Egg[]>> | null>(null);

  // save all stats to one ref
  const stats = useRef<null | {
    rareEgg: Egg & { location: Biome };
    gameStart: number;
    visits: number;
    skips: number;
    misclicks: number;
  }>(null);

  const handleBiomeChange = (nextBiome: Biome) => {
    if (stats.current) {
      stats.current.visits++;
      if (stats.current.rareEgg.location === biome) stats.current.skips++;
    }
    setBiome(nextBiome);
  };

  const handleEggCatch = (egg: Egg) => {
    if (stats.current) {
      if (stats.current.rareEgg.breed !== egg.breed) stats.current.misclicks++;
      else endGame();
    }
  };

  const handleClick = (e: MouseEvent) => {
    console.log(e);
    // todo: click handler to count misclicks other than wrong egg catches
  };

  function startGame() {
    const generatedEggs = generateBiomeEggs();
    setEggs(generatedEggs.eggs);
    stats.current = {
      rareEgg: generatedEggs.rareEgg,
      gameStart: performance.now(),
      visits: 0,
      skips: 0,
      misclicks: 0,
    };
  }

  function endGame() {
    setEggs(null);
    stats.current = null;
  }

  return {
    biome,
    eggs,
    stats,
    handleBiomeChange,
    handleEggCatch,
    handleClick,
    startGame,
  };
}
