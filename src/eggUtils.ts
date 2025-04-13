import data from './eggs.json';
import { type Biome, type Egg } from './types';

const rareEggs: Egg[] = [
  {
    breed: 'Gold',
    description: 'This egg is very reflective, almost metallic-looking.',
  },
  {
    breed: 'Silver',
    description: 'This egg gives off a beautiful glow.',
  },
  {
    breed: 'Staterae',
    description: 'Mana flows like a current through this glassy egg.',
  },
];

export const rareBreeds = rareEggs.map((r) => r.breed);

function getRandomRareEgg(): Egg {
  return rareEggs[Math.floor(Math.random() * rareEggs.length)];
}

export function generateBiomeEggs() {
  const eggs: Partial<Record<Biome, Egg[]>> = {};

  // randomly pick the biome where we'll swap in a rare
  const randomBiomeIndex = Math.floor(Math.random() * 6);
  const rareEgg = getRandomRareEgg();
  let rareEggLocation: Biome = 'alpine';

  Object.keys(data).forEach((biomeKey, index) => {
    const thisBiomeEggs = data[biomeKey as Biome]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    // if this biome's index matches the random index we pulled, swap in the rare
    if (index === randomBiomeIndex) {
      thisBiomeEggs[Math.floor(Math.random() * 3)] = rareEgg;
      rareEggLocation = biomeKey as Biome;
    }

    eggs[biomeKey as Biome] = thisBiomeEggs;
  });

  return {
    eggs,
    rareEgg: { ...rareEgg, location: rareEggLocation },
  };
}
