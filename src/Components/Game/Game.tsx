import axios from "axios";
import { useNavigate } from "react-router-dom";
const VITE_URL_PLAYERS = import.meta.env.VITE_URL_PLAYERS;

import uno from "../../Media/Images/1.png";
import unoLuz from "../../Media/Images/1luz.png";
import dos from "../../Media/Images/2.png";
import dosLuz from "../../Media/Images/2luz.png";
import tres from "../../Media/Images/3.png";
import tresLuz from "../../Media/Images/3luz.png";
import cuatro from "../../Media/Images/4.png";
import cuatroLuz from "../../Media/Images/4luz.png";
import greenSound from "../../Media/Sounds/1.mp3";
import redSound from "../../Media/Sounds/2.mp3";
import yellowSound from "../../Media/Sounds/3.mp3";
import blueSound from "../../Media/Sounds/4.mp3";

import styles from "./Game.module.css";
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export const Game = () => {
  const [leaderBoard, setLeaderBoard] = useState<Players[]>();
  const [green, setGreen] = useState<string>(uno);
  const [red, setRed] = useState<string>(dos);
  const [yellow, setYellow] = useState<string>(tres);
  const [blue, setBlue] = useState<string>(cuatro);

  const [position, setPosition] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [sequence, setSequence] = useState<number[]>([
    Math.floor(Math.random() * (5 - 1)) + 1,
  ]);

  const navigate = useNavigate();

  useEffect (() => {
    axios.get(VITE_URL_PLAYERS)
    .then ((res) => {
      setLeaderBoard(res.data.sort((r1: Players, r2: Players) => (r1.score < r2.score) ? 1 : (r1.score > r2.score) ? -1 : 0))
    })
  },[])

  useEffect(() => {
    setTimeout(() => {
      showSequence();
    }, 400);
  }, [sequence]);

  type Players = {
    id: number,
    name: string,
    score: number
  }

  type Color = {
    on: string;
    off: string;
    setter: Dispatch<SetStateAction<string>>;
    sound: HTMLAudioElement;
  };

  const colors = new Map<string, Color>();

  colors.set("1", {
    on: unoLuz,
    off: uno,
    setter: setGreen,
    sound: new Audio(greenSound),
  });

  colors.set("2", {
    on: dosLuz,
    off: dos,
    setter: setRed,
    sound: new Audio(redSound),
  });

  colors.set("3", {
    on: tresLuz,
    off: tres,
    setter: setYellow,
    sound: new Audio(yellowSound),
  });

  colors.set("4", {
    on: cuatroLuz,
    off: cuatro,
    setter: setBlue,
    sound: new Audio(blueSound),
  });

  const handleLights = (c: Color | undefined) => {
    c?.setter(c.on);
    c?.sound.play();
    setTimeout(() => {
      c?.setter(c.off);
    }, 400);
  };

  const lost = () => {
    const lowerScore: Players | undefined = leaderBoard?.find((p) => p.score < score);
    const newScore: Players | undefined = leaderBoard?.reduce((prev, curr) => prev.score < curr.score ? prev : curr);
    if (lowerScore !== undefined && newScore !== undefined) {
      sessionStorage.setItem("player", JSON.stringify(newScore.id));
      sessionStorage.setItem("score", JSON.stringify(score));
      navigate("/highScore");
    } else {
      navigate("/lost");
    }
  }

  const showSequence = () => {
    setPlay(false);
    let sequenceAux: number = 0;
    let interval = setInterval(() => {
      if (sequenceAux < sequence.length) {
        const c: Color | undefined = colors.get(
          sequence[sequenceAux]?.toString()
        );
        handleLights(c);
        sequenceAux = sequenceAux + 1;
      } else {
        clearInterval(interval);
        setPlay(true);
      }
    }, 600);
  };

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const selected: string = (e.target as HTMLDivElement).id;
    const c: Color | undefined = colors.get(selected);
    handleLights(c);

    if (Number(selected) === sequence[position]) {
      if (position === sequence.length - 1) {
        setSequence([...sequence, Math.floor(Math.random() * (5 - 1)) + 1]);
        setPosition(0);
        setScore(score + 1);
      } else {
        setPosition(position + 1);
      }
    } else {
      lost();
    }
  };

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <div
          className={styles.colors}
          id="1"
          style={{ backgroundImage: `url(${green})` }}
          onClick={play === true ? handleMove : undefined}
        ></div>
        <div
          className={styles.colors}
          id="2"
          style={{ backgroundImage: `url(${red})` }}
          onClick={play === true ? handleMove : undefined}
        ></div>
        <div
          className={styles.colors}
          id="3"
          style={{ backgroundImage: `url(${yellow})` }}
          onClick={play === true ? handleMove : undefined}
        ></div>
        <div
          className={styles.colors}
          id="4"
          style={{ backgroundImage: `url(${blue})` }}
          onClick={play === true ? handleMove : undefined}
        ></div>
      </div>
      <div className={styles.score}>
        <span>{`SCORE: ${score}`}</span>
      </div>
    </div>
  );
};
