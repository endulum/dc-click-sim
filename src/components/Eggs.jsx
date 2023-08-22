import MysteryEgg from '../assets/mystery-egg.gif';

export default function Eggs({
  isSimRunning, stopSim, eggDescriptions, setCaughtBreed,
}) {
  return (
    <div className="sim">
      <p>
        You arrive at a purely hypothetical cave and see many large dragons scattered about,
        some with hatchlings. Nearby, there is a pile of several purely hypothetical eggs.
      </p>
      <p>
        You don’t want to disturb the dragons, but some of the eggs are far enough away
        that you could steal one. Three of the eggs catch your eye. Which do you take?
      </p>
      <div className="sim-eggs">
        { eggDescriptions.map((egg) => (
          <div className="sim-egg">
            { isSimRunning && egg.breed !== 'Common' ? (
              <button
                type="button"
                className="target-egg"
                onClick={() => {
                  stopSim();
                  setCaughtBreed(egg.breed);
                }}
              >
                <img src={MysteryEgg} alt="A mystery egg." />
              </button>
            ) : (
              <img src={MysteryEgg} className={!isSimRunning && 'semi'} alt="A mystery egg." />
            )}
            <br />
            {isSimRunning ? (
              <span>{egg.description}</span>
            ) : (
              <span>...</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
