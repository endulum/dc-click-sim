import data from './eggs.json';
import { type Biome, type Egg } from '../types';

export const rareEggs: Egg[] = [
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
  {
    breed: 'Xenowyrm',
    description: 'Mana courses throughout this glassy egg.',
  },
  {
    breed: 'Copper',
    description: 'This egg gleams with a reddish shine.',
  },
  {
    breed: 'Cheese',
    description: 'This egg is soft and smells uncannily like cheese.',
  },
  {
    breed: 'Chicken',
    description: 'This egg is much smaller than the others.',
  },
  {
    breed: 'Paper',
    description:
      'This egg is tiny and made out of several pieces of paper folded together.',
  },
];

export const rareBreeds: string[] = rareEggs.map((r) => r.breed);

function generateRareEgg(selectedRares: string[]): Egg {
  const filteredEggs = rareEggs.filter((r) => selectedRares.includes(r.breed));

  if (filteredEggs.length === 0)
    throw new Error(
      `No rares filtered with selection: ${JSON.stringify(selectedRares)}`
    );

  return filteredEggs[Math.floor(Math.random() * filteredEggs.length)];
}

function generateRarePos(selectedPositions: string[]): number {
  const positions: number[] = [];
  ['left', 'middle', 'right'].forEach((pos, index) => {
    if (selectedPositions.includes(pos)) positions.push(index);
  });

  if (selectedPositions.length === 0)
    throw new Error(
      `No positions filtered with selection: ${JSON.stringify(
        selectedPositions
      )}`
    );

  return positions[Math.floor(Math.random() * positions.length)];
}

export function generateAllEggs(
  selectedRares: string[],
  selectedPositions: string[]
) {
  const allEggs: Partial<Record<Biome, Egg[]>> = {};
  const randomIndex = Math.floor(Math.random() * 6);

  const rareEgg = generateRareEgg(selectedRares);
  const rareEggPosition = generateRarePos(selectedPositions);

  Object.keys(data).forEach((biome, index) => {
    const thisBiomeEggs = data[biome as Biome]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    if (index === randomIndex) {
      thisBiomeEggs[rareEggPosition] = rareEgg;
    }

    allEggs[biome as Biome] = thisBiomeEggs;
  });

  return {
    eggs: allEggs,
    target: {
      breed: rareEgg.breed,
      location: Object.keys(data)[randomIndex],
      position: ['left', 'middle', 'right'][rareEggPosition],
    },
  };
}
