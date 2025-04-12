import { EndRoundStats } from '../types';

export function History({ rounds }: { rounds: EndRoundStats[] }) {
  const msToSecs = (ms: number): string => {
    return (ms / 1000).toFixed(2) + ' seconds';
  };

  return (
    <div className="history">
      <h2>Catch history</h2>

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
                  <td>{msToSecs(round.time)}</td>
                  <td>{round.visits}</td>
                  <td>{msToSecs(round.time / (round.visits + 1))}</td>
                  <td>{round.skips}</td>
                  <td>{round.misclicks}</td>
                </tr>
              ))
              .reverse()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
