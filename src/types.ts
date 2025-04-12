export type Biome =
  | 'alpine'
  | 'coast'
  | 'desert'
  | 'forest'
  | 'jungle'
  | 'volcano';

export type Egg = { breed: string; description: string };

export type RoundStats = {
  rareEgg: Egg & { location: Biome };
  // what rare was meant to be caught, and where it was

  start: number;
  // performance.now() of the round

  visits: number;
  // how many times the biome changed

  skips: number;
  // how many times the biome changed when the current biome had the rare

  misclicks: number;
  // how many clicks occurred not on the target rare or a biome link
};

export type EndRoundStats = RoundStats & { time: number };
