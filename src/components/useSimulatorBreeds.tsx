import { useState } from 'react';

import { rareBreeds } from '../eggUtils';

export function useSimulatorBreeds() {
  const [simTargetBreeds, setSimTargetBreeds] = useState<string[]>(rareBreeds);

  const removeBreed = (breed: string) => {
    setSimTargetBreeds(simTargetBreeds.filter((b) => b !== breed));
  };

  const addBreed = (breed: string) => {
    setSimTargetBreeds([...simTargetBreeds, breed]);
  };

  return { simTargetBreeds, removeBreed, addBreed };
}
