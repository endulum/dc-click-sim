import { useState, useEffect } from 'react';
import Wrapper from './components/Wrapper';
import './App.css';

// for the ready bar:
// set true when the bar is being moused over
// set false when the mouse exits the bar OR when the bar has been moused over for enough time

// for the sim wrapper:
// set true when the ready bar has been moused over for enough time
// set false when the mouse exits the wrapper

// NOT readying and NOT started = the sim is off
// NOT readying and IS started =  the sim is on
// IS readying and NOT started = countdown until the sim starts
// IS readying and IS started = this will not happen,
//                              because ready will be set to false and started will be set to true
//                              in the same condition - when the mouseover lasts an amount of time

export default function App() {
  return (
    <Wrapper />
  );
}

// function Wrapper() {
//   const [started, setStarted] = useState(false);
//   return (
//     <div className="wrapper" onMouseLeave={() => setStarted(false)}>
//       <ReadyBar activated={started} activation={() => setStarted(true)} />
//       { started && (<p>doing something</p>) }
//     </div>
//   );
// }

// function ReadyBar({ activated, activation }) {
//   const [readying, setReadying] = useState(false);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     console.log(`the Wrapper parent's activation is ${activated}`);
//     if (!activated) {
//       setReadying(false);
//       setCount(0);
//     }
//   }, [activated]);

//   useEffect(() => {
//     console.log(`count is ${count}, readying is ${readying}`);

//     if (count === 3) {
//       setReadying(false);
//       activation();
//     }

//     let interval;
//     if (readying) { interval = setInterval(() => setCount(count + 1), 1000); }
//     return () => clearInterval(interval);
//   }, [count, readying]);

//   return (
//     <div
//       className="readybar"
//       onMouseEnter={() => {
//         if (count < 3) {
//           setReadying(true);
//         }
//       }}
//       onMouseLeave={() => {
//         if (readying) {
//           setReadying(false);
//           setCount(0);
//         }
//       }}
//     >
//       { !readying && count === 0 && (
//         <p>Hover over to start countdown.</p>
//       ) }
//       { readying && count < 3 && (
//         <p>{3 - count}</p>
//       ) }
//       { !readying && count === 3 && (
//         <p>Countdown done, doing something.</p>
//       )}
//     </div>
//   );
// }
