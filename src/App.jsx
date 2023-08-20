function App() {
  const text = 'Hello, React';
  return (
    <Paragraph
      text={text}
    />
  );
}

function Paragraph({ text }) {
  return (
    <p>{text}</p>
  );
}

export default App;
