import { EndRoundStats } from '../types';

export function History({
  rounds,
  wipeRounds,
}: {
  rounds: EndRoundStats[];
  wipeRounds: () => void;
}) {
  const msToSecs = (ms: number): string => {
    return (ms / 1000).toFixed(2) + ' seconds';
  };

  return (
    <div className="history">
      <div className="space-between">
        <h2>Catch history</h2>
        {rounds.length > 0 && (
          <button onClick={wipeRounds}>Wipe history</button>
        )}
      </div>

      {rounds.length > 0 ? (
        <div className="table">
          <table>
            <thead>
              <tr>
                <td>#</td>
                <td>Breed</td>
                <td>Total time</td>
                <td>Biome visits</td>
                <td>Avg. skim (time ÷ visits)</td>
                <td>Skips</td>
                <td>Misclicks</td>
              </tr>
            </thead>
            <tbody>
              {rounds
                .map((round, index) => (
                  <tr key={round.start}>
                    <td>{index + 1}</td>
                    <td>{round.rareEgg.breed}</td>
                    <td>≈{msToSecs(round.time)}</td>
                    <td>{round.visits}</td>
                    <td>≈{msToSecs(round.time / (round.visits + 1))}</td>
                    <td>{round.skips}</td>
                    <td>{round.misclicks}</td>
                  </tr>
                ))
                .reverse()}
            </tbody>
          </table>
        </div>
      ) : (
        <p>
          <i>Statistics for rounds you play will show up here.</i>
        </p>
      )}
    </div>
  );
}
