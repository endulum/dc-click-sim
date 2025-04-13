import { useState, type ChangeEvent } from 'react';

export function Breeds() {
  const [breeds, setBreeds] = useState<string[]>([
    'Silver',
    'Gold',
    'Staterae',
  ]);

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
        {['Silver', 'Gold', 'Staterae'].map((breed) => (
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
