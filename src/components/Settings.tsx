import { type ChangeEvent } from 'react';

import { rareBreeds } from '../eggs/eggUtils';

export function Settings({
  addBreed,
  removeBreed,
  addPos,
  removePos,
}: {
  addBreed: (breed: string) => void;
  removeBreed: (breed: string) => void;
  addPos: (breed: string) => void;
  removePos: (breed: string) => void;
}) {
  const handleBreedCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === false) removeBreed(e.target.name);
    else addBreed(e.target.name);
  };

  const handlePosCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === false) removePos(e.target.name);
    else addPos(e.target.name);
  };

  return (
    <div className="settings">
      <div className="setting">
        <h3>Breeds to simulate</h3>
        <div className="checkboxes">
          {rareBreeds.map((breed) => (
            <div className="checkbox-row" key={breed}>
              <input
                type="checkbox"
                name={breed}
                id={breed}
                onChange={handleBreedCheck}
                defaultChecked={['Gold', 'Silver', 'Staterae'].includes(breed)}
              />
              <label htmlFor={breed}>{breed}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="setting">
        <h3>Spawn positions</h3>
        <div className="checkboxes">
          {['left', 'middle', 'right'].map((pos) => (
            <div className="checkbox-row" key={pos}>
              <input
                type="checkbox"
                name={pos}
                id={pos}
                onChange={handlePosCheck}
                defaultChecked={true}
              />
              <label htmlFor={pos}>{pos}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
