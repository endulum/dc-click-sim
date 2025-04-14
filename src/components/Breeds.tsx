import { type ChangeEvent } from 'react';

import { rareBreeds } from '../eggUtils';

export function Breeds({
  addBreed,
  removeBreed,
}: {
  addBreed: (breed: string) => void;
  removeBreed: (breed: string) => void;
}) {
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === false) removeBreed(e.target.name);
    else addBreed(e.target.name);
  };

  return (
    <div>
      <h3>Breeds to simulate</h3>
      <div className="checkboxes">
        {rareBreeds.map((breed) => (
          <div className="checkbox-row" key={breed}>
            <input
              type="checkbox"
              name={breed}
              id={breed}
              onChange={handleCheck}
              defaultChecked={true}
            />
            <label htmlFor={breed}>{breed}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
