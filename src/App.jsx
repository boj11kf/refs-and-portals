import Player from './components/Player.jsx';
import TimerChallenge from './components/TimerChallenge.jsx';

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChallenge title={"easy"} targetTime={4} />
        <TimerChallenge title={"medium"} targetTime={3} />
        <TimerChallenge title={"hard"} targetTime={2} />
        <TimerChallenge title={"impossible"} targetTime={1} />
      </div>
    </>
  );
}

export default App;
