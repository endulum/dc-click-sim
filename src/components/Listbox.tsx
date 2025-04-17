import { useState, type ChangeEvent } from 'react';

export function Listbox({
  values,
  allValues,
  addValue,
  removeValue,
}: {
  values: Array<string>;
  allValues: Array<string>;
  addValue: (item: string) => void;
  removeValue: (item: string) => void;
}) {
  const [flyoutOpen, setFlyoutOpen] = useState(false);

  const handleItemCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === false) removeValue(e.target.name);
    else addValue(e.target.name);
  };

  return (
    <div className="listbox-wrapper">
      <input type="text" value={values.join(', ')} readOnly />
      <button onClick={() => setFlyoutOpen(!flyoutOpen)}>
        {flyoutOpen ? 'Close' : 'Open'}
      </button>
      {flyoutOpen && (
        <div className="listbox-flyout">
          {allValues.map((value) => (
            <div className="listbox-flyout-item" key={value}>
              <label htmlFor={value}>
                <input
                  type="checkbox"
                  name={value}
                  id={value}
                  onChange={handleItemCheck}
                  checked={values.includes(value)}
                  onFocus={(e) => {
                    if (e.currentTarget.parentElement)
                      e.currentTarget.parentElement.classList.add('focus');
                  }}
                  onBlur={(e) => {
                    if (e.currentTarget.parentElement)
                      e.currentTarget.parentElement.classList.remove('focus');
                  }}
                />
                <span>{value}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
