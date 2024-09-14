import {useRef, useState} from "react";

/* Componens useRef hasznalataval */
/* 
  A state modositas re-renderinget von maga utan
  A ref csak a hatterben modositja a DOM-ot

*/
export default function Player() {

  const playerName = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);


  const handleClick = () => {
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = ""
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
      <p>
        <input
          ref={playerName}
          type="text"
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}


/* Componens useRef hasznalata nelkul */
/* export default function Player() {

  const [enteredPlayerName, setEnteredPlayerName] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (event) => {
    setSubmitted(false);
    setEnteredPlayerName(event.target.value);
  }

  const handleClick = () => {
    setSubmitted(true);
  }

  return (
    <section id="player">
      <h2>Welcome {submitted ? enteredPlayerName : 'unknown entity'}</h2>
      <p>
        <input type="text" onChange={handleChange} value={enteredPlayerName}/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
} */
