import { useEffect, useRef, useState } from "react";
import "./App.css";
import Food from "./components/Food";
import Snake from "./components/Snake";
import kein from "./assests/kein.wav";
import loss from "./assests/loss.wav"


const randomFoodPosition = () => {
  const pos = { x: 0, y: 0 };
  let x = Math.floor(Math.random() * 96);
  let y = Math.floor(Math.random() * 96);
  pos.x = x - (x % 4);
  pos.y = y - (y % 4);
  return pos;
};

const initialSnake = {
  snake: [
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 8, y: 0 },
  ],
  direction: "ArrowRight",
  speed: 40,
};

function App() {

  function playkein() {
    new Audio(kein).play()
    
  }
  function lossaud()
  {
    new Audio(loss).play()
  }

function aud(){
  
  playkein()
}

  const [snake, setSnake] = useState(initialSnake.snake);
  const [lastDirection, setLastDirection] = useState(initialSnake.direction);
  const [foodPosition, setFoodPosition] = useState(randomFoodPosition);
  const [isStarted, setIsStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const playgroundRef = useRef();

  if(setIsStarted=== true)
  {
    
  }

  useEffect(() => {
    if (!isStarted) 
    
    return;

    if (
      snake[snake.length - 1].x === 100 ||
      snake[snake.length - 1].x === -4 ||
      snake[snake.length - 1].y === 100 ||
      snake[snake.length - 1].y === -4
    ) {
      setGameOver(true);
      lossaud()
      return;
    }
    const interval = setInterval(move, initialSnake.speed);
    return () => clearInterval(interval);
  });

  const move = () => {
    const tmpSnake = [...snake];
    let x = tmpSnake[tmpSnake.length - 1].x,
      y = tmpSnake[tmpSnake.length - 1].y;
      
    switch (lastDirection) {
      case "ArrowUp":
        y -= 4;
        break;
      case "ArrowRight":
        x += 4;
        break;
      case "ArrowDown":
        y += 4;
        break;
      case "ArrowLeft":
        x -= 4;
        break;
      default:
        break;
    }


    tmpSnake.push({
      x,
      y,
    });
    if (x !== foodPosition.x || y !== foodPosition.y) tmpSnake.shift();
    else setFoodPosition(randomFoodPosition());
    setSnake(tmpSnake);
  };

  return (
    <div
      className="App"
      onKeyDown={(e) => setLastDirection(e.key)}
      ref={playgroundRef}
      tabIndex={0}
      onKeyUp={(e) => aud(e.key)}
    >
      {isStarted && <div className="count"> Score:{snake.length - 3}</div>}

      {!isStarted && (
        <>
        <div className="welcome-msg wem">Welcome to Cobra Krack!!</div>
          <button
            onClick={() => {
              setIsStarted(true);
              playgroundRef.current.focus();
            }}
            type="submit"
          >
            Start
          </button>
          <div className="arrow-msg text">Press Arrows keys to play!</div>
        </>
      )}
      {gameOver && (
        <>
          <div className="game-over text">Game Over!</div>
          <button
            onClick={() => {
              setIsStarted(true);
              setGameOver(false);
              setSnake(initialSnake.snake);
              setLastDirection(initialSnake.direction);
              playgroundRef.current.focus();
            }}
            type="submit"
          >
            Restart
          </button>
        </>
      )}
      <Snake snake={snake} lastDirection={lastDirection} />
      {!gameOver && (
        <>
          <Food position={foodPosition} />
        </>
      )}
    </div>
  );
}

export default App;
      