export default function CatchMessage({ time }) {
  return (
    <div className="catch-message">
      <p>
        You caught the egg in
        {' '}
        <b>{time.toFixed(2)}</b>
        {' '}
        seconds!
      </p>
      <p>Can you do better?</p>
    </div>
  );
}
