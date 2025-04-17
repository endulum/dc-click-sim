import { generateAllEggs } from '../src/eggs/eggUtils';

const defaults: [string[], string[]] = [
  ['Gold', 'Silver', 'Staterae'],
  ['left', 'middle', 'right'],
];

describe('consistent behavior', () => {
  const iterations = 20;

  test('just log', () => {
    const output = generateAllEggs(...defaults);
    console.dir(output, { depth: null });
  });

  test('with defaults', () => {
    for (let i = 0; i < iterations; i++) {
      const output = generateAllEggs(...defaults);

      // always 3 eggs per biome
      Object.values(output.eggs).forEach((biome) => {
        expect(biome.length).toBe(3);
      });

      // always exactly one G/S/S
      expect(
        Object.values(output.eggs)
          .flat()
          .filter((egg) => defaults[0].includes(egg.breed)).length
      ).toEqual(1);
    }
  });

  test('with custom rare selection', () => {
    for (let i = 0; i < iterations; i++) {
      const allRares = [
        ...defaults[0],
        'Cheese',
        'Chicken',
        'Paper',
        'Xenowyrm',
        'Copper',
      ];
      // get random rare selection
      const randomCount = Math.floor(Math.random() * allRares.length) + 1;
      const shuffledBreeds = allRares.sort(() => 0.5 - Math.random());
      const randomSelection = shuffledBreeds.slice(0, randomCount);

      const output = generateAllEggs(randomSelection, defaults[1]);
      const foundEggs = Object.values(output.eggs)
        .flat()
        .filter((egg) => randomSelection.includes(egg.breed));

      expect(foundEggs.length).toEqual(1);
    }
  });

  test('with custom position selection', () => {
    for (let i = 0; i < iterations; i++) {
      // get random position selection
      const randomCount = Math.floor(Math.random() * defaults[1].length) + 1;
      const shuffledPoses = defaults[1].sort(() => 0.5 - Math.random());
      const randomSelection = shuffledPoses.slice(0, randomCount);

      const output = generateAllEggs(defaults[0], randomSelection);

      Object.values(output.eggs).forEach((biome) => {
        const rareEgg = biome.find((e) => e.breed === output.target.breed);
        if (rareEgg) {
          const expectedPoses: number[] = [];
          ['left', 'middle', 'right'].forEach((pos, index) => {
            if (randomSelection.includes(pos)) expectedPoses.push(index);
          });
          expect(expectedPoses).toContain(biome.indexOf(rareEgg));
        }
      });
    }
  });
});
