import { useState } from 'react';

import { rareBreeds } from '../eggs/eggUtils';

export function useSimulatorSettings() {
  const [simTargetBreeds, setSimTargetBreeds] = useState<string[]>(
    rareBreeds.filter((breed) => ['Gold', 'Silver', 'Staterae'].includes(breed))
  );

  const removeBreed = (breed: string) => {
    setSimTargetBreeds(simTargetBreeds.filter((b) => b !== breed));
  };

  const addBreed = (breed: string) => {
    setSimTargetBreeds([...simTargetBreeds, breed]);
  };

  const [simPositions, setSimPositions] = useState<string[]>([
    'left',
    'middle',
    'right',
  ]);

  const removePos = (pos: string) => {
    setSimPositions(simPositions.filter((p) => p !== pos));
  };

  const addPos = (pos: string) => {
    setSimPositions([...simPositions, pos]);
  };

  return {
    simTargetBreeds,
    removeBreed,
    addBreed,
    simPositions,
    removePos,
    addPos,
  };
}
