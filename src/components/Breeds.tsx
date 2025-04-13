import { useState, type ChangeEvent } from 'react';

import { rareBreeds } from '../eggUtils';

export function Breeds() {
  const [breeds, setBreeds] = useState<string[]>(rareBreeds);

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === false) {
      setBreeds(breeds.filter((b) => b !== e.target.name));
    } else {
      setBreeds([...breeds, e.target.name]);
    }
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
