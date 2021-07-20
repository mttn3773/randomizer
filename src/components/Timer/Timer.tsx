import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlinePause } from "react-icons/ai";
import {
  BsFillPlayFill,
  BsChevronCompactUp,
  BsChevronCompactDown,
  BsChevronDoubleUp,
  BsArrowCounterclockwise,
} from "react-icons/bs";
import "./Timer.scss";

const INITIAL_TIME = 60 * 10;

interface TimerProps {}

export const Timer: React.FC<TimerProps> = ({}) => {
  const [time, setTime] = useState<number>(INITIAL_TIME);
  const [isGoing, setGoing] = useState<boolean>(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!isGoing) {
      if (timer) clearInterval(timer);
      return;
    }
    const interval = setInterval(() => setTime((prev) => prev - 1), 1000);
    setTimer(interval);
  }, [isGoing]);
  const parseTime = () => {
    return `${Math.floor(time / 60)}:${("00" + (time % 60)).slice(-2)}`;
  };
  const handleAddTime = (value: number) => {
    return setTime((prev) => prev + value);
  };
  const handleReset = () => {
    setGoing(false);
    return setTime(INITIAL_TIME);
  };
  return (
    <div className="timer-container">
      <div className="time-display-container">
        <h2>{parseTime()}</h2>
      </div>
      <div className="btn-group">
        <button onClick={() => setGoing(!isGoing)}>
          {isGoing ? <AiOutlinePause /> : <BsFillPlayFill />}
        </button>
        <button onClick={handleReset}>
          <BsArrowCounterclockwise />
        </button>
        <button onClick={() => handleAddTime(60)}>
          <BsChevronCompactUp />
        </button>
        <button onClick={() => handleAddTime(-60)}>
          <BsChevronCompactDown />
        </button>
        <button onClick={() => handleAddTime(120)}>
          <BsChevronDoubleUp />
        </button>
      </div>
    </div>
  );
};
