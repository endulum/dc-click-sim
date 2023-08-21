export default function CatchMessage({ time, caughtBreed }) {
  return (
    <div className="catch-message">
      <p>
        You caught the
        {' '}
        <b>{caughtBreed}</b>
        {' '}
        egg in
        {' '}
        <b>{time.toFixed(3)}</b>
        {' '}
        seconds!
      </p>
      <small>Can you do better? Hover over the top bar try again.</small>
    </div>
  );
}
