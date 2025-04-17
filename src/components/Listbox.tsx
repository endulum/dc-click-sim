import { useState, useRef, type ChangeEvent } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

export function Listbox({
  id,
  values,
  allValues,
  addValue,
  removeValue,
}: {
  id: string;
  values: Array<string>;
  allValues: Array<string>;
  addValue: (item: string) => void;
  removeValue: (item: string) => void;
}) {
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleItemCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === false) removeValue(e.target.name);
    else addValue(e.target.name);
  };

  const handleClickOutside = () => {
    setFlyoutOpen(false);
  };

  useOnClickOutside(
    wrapperRef as unknown as React.RefObject<HTMLDivElement>,
    handleClickOutside,
    'mousedown'
  );

  useOnClickOutside(
    wrapperRef as unknown as React.RefObject<HTMLDivElement>,
    handleClickOutside,
    'focusout'
  );

  return (
    <div
      className="listbox-wrapper"
      ref={wrapperRef}
      onKeyDown={(e) => {
        if (e.code === 'Escape') setFlyoutOpen(false);
      }}
    >
      <p>
        {values.length > 0 ? <b>{values.join(', ')}</b> : <i>None selected</i>}
      </p>
      <button id={id} onClick={() => setFlyoutOpen(!flyoutOpen)}>
        {flyoutOpen ? 'Done' : 'Select'}
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
