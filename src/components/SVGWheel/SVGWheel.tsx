import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { INormalizedItem } from "../../interfaces/item.interface";
import { defineWinner } from "../../utils/defineWinner";
import {
  converPercantageToDegrees,
  polarToCartesian,
} from "../../utils/drawCircle";
import { WheelSector } from "../WheelSector/WheelSector";
import "./SVGWheel.scss";
import gsap from "gsap";
import { useRef } from "react";
import { calculateSpinAngle } from "../../utils/spin";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalStore";
import {
  mapItemsForElimination,
  mapItemsToNormalized,
} from "../../utils/items.utils.";

const WIDTH = 600;
const HEIGHT = 600;

export type Point = {
  x: number;
  y: number;
};

interface SVGWheelProps {
  normalizedItemsList: INormalizedItem[];
  setNormalizedItems: React.Dispatch<React.SetStateAction<INormalizedItem[]>>;
}

const colorArr = ["red", "blue", "teal", "coral", "purple", "yellow"];

const centerX = WIDTH / 2;
const centerY = HEIGHT / 2;
const radius = WIDTH / 2;

export const SVGWheel: React.FC<SVGWheelProps> = ({}) => {
  const {
    state: { items },
  } = useContext(DataContext);
  const [winner, setWinner] = useState<INormalizedItem | null>(null);
  const [animate, setAnimate] = useState<boolean>(false);
  const [totalAngle, setTotalAngle] = useState<number>(0);
  const [isEliminatingMode, setEliminatingMode] = useState<boolean>(false);
  const [normalizedItems, setNormalizedItems] = useState<INormalizedItem[]>([]);
  const [eliminatedItems, setEliminatedItems] = useState<number[]>([]);
  const winnerText = () => {
    if (isEliminatingMode) {
      return (
        <h1>
          {winner && !animate
            ? `${winner.name} was eliminated`
            : "Eliminating..."}
        </h1>
      );
    }
    return <h1>Winner is {winner && !animate ? winner.name : "..."}</h1>;
  };
  useEffect(() => {
    const normalizedItems = isEliminatingMode
      ? mapItemsForElimination(items, eliminatedItems)
      : mapItemsToNormalized(items);
    setNormalizedItems(normalizedItems);
  }, [eliminatedItems, items, isEliminatingMode]);
  const wheelRef = useRef<SVGSVGElement | null>(null);
  const handleChangeMode = (e: ChangeEvent<HTMLInputElement>) => {
    setEliminatedItems([]);
    setEliminatingMode(e.target.checked);
  };
  const drawSectors = (): JSX.Element[] => {
    const resultArr: JSX.Element[] = [];
    let startPoint: Point = { x: centerX, y: 0 };
    let angle = -90;
    normalizedItems.forEach(({ percentage, name, id }, index) => {
      if (!percentage) return;
      const incrementAngle = converPercantageToDegrees(percentage);
      const textAngle = (angle * 2 + incrementAngle) / 2;
      angle += incrementAngle;
      const endPoint = polarToCartesian(centerX, centerY, radius, angle);
      const fillColor =
        index < colorArr.length
          ? colorArr[index]
          : colorArr[index % colorArr.length];
      const largeArcFlag = !!(percentage >= 50);

      const sector = (
        <WheelSector
          percantage={percentage}
          key={index}
          centerX={centerX}
          centerY={centerY}
          endPoint={endPoint}
          startPoint={startPoint}
          radius={radius}
          text={percentage > 1 ? name : ""}
          fillColor={fillColor}
          largeArcFlag={largeArcFlag}
          angle={textAngle}
        />
      );
      resultArr.push(sector);
      startPoint = endPoint;
    });
    return resultArr;
  };

  const handleEliminate = (winner: INormalizedItem) => {
    setEliminatedItems((prev) => [...prev, winner.id]);
  };
  const handleAnimation = () => {
    setAnimate(true);
    const seed = Math.random();
    const offset = totalAngle - Math.ceil(totalAngle / 360) * 360;
    const newAngle = totalAngle + calculateSpinAngle(seed, offset);
    setTotalAngle(newAngle);
    const winner = defineWinner(seed, normalizedItems);
    gsap
      .timeline({
        onComplete: () => {
          setWinner(winner);
          if (isEliminatingMode) handleEliminate(winner);
          setAnimate(false);
        },
      })
      .to(wheelRef.current, { rotate: newAngle, duration: 5 });
  };
  const sectors = drawSectors();
  return (
    <div className="game-container">
      <div
        className="wheel-container"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="selector-conteiner"
          style={{
            zIndex: 999,
            position: "absolute",
            top: 0,
            display: `${sectors.length ? "flex" : "none"}`,
          }}
        >
          <svg width="40" height="60">
            <path
              stroke="#efefef"
              strokeWidth="3px"
              d="M 20 0 L 0 30 L 40 30 L 20 0"
            />
          </svg>
        </div>
        <svg ref={wheelRef} width={WIDTH} height={HEIGHT}>
          {sectors.map((sector) => sector)}
        </svg>
      </div>
      <div className="winner-info">
        {winnerText()}
        <div>
          <input
            onChange={handleChangeMode}
            type="checkbox"
            id="elimination-mode"
          />
          <label htmlFor="elimination-mode"> Elimination mode </label>
        </div>
        <button
          disabled={animate || normalizedItems.length < 2}
          onClick={handleAnimation}
        >
          ROLL
        </button>
      </div>
    </div>
  );
};
