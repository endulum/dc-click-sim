// import { useState } from 'react';

export function Breeds() {
  // const [breeds, setBreeds] = useState<string[]>([]);

  return (
    <div>
      <h3>Breeds to simulate</h3>
      <div className="checkboxes">
        {['Silver', 'Gold', 'Staterae'].map((breed) => (
          <div className="checkbox-row" key={breed}>
            <input type="checkbox" name={breed} id={breed} />
            <label htmlFor={breed}>{breed}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
