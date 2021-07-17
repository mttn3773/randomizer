import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useWinner } from "../../hooks/useWinner";
import { INormalizedItem } from "../../interfaces/item.interface";
import { defineWinner } from "../../utils/defineWinner";
import {
  converPercantageToDegrees,
  polarToCartesian,
} from "../../utils/drawCircle";
import { WheelSector } from "../WheelSector/WheelSector";

const WIDTH = 600;
const HEIGHT = 600;

export type Point = {
  x: number;
  y: number;
};

interface SVGWheelProps {
  normalizedItemsList: INormalizedItem[];
}

const colorArr = ["red", "blue", "teal", "coral", "purple", "yellow"];

const centerX = WIDTH / 2;
const centerY = HEIGHT / 2;
const radius = WIDTH / 2;

export const SVGWheel: React.FC<SVGWheelProps> = ({ normalizedItemsList }) => {
  const [seed, setSeed] = useState<number | null>(null);
  const [winner, setWinner] = useState<INormalizedItem | null>(null);
  useEffect(() => {
    if (!seed) return;
    const winner = defineWinner(seed, normalizedItemsList);
    setWinner(winner);
  }, [seed]);

  const drawSectors = (): JSX.Element[] => {
    const resultArr: JSX.Element[] = [];
    let startPoint: Point = { x: centerX, y: 0 };
    let angle = -90;
    normalizedItemsList.map(({ percentage, name }, index) => {
      const incrementAngle = converPercantageToDegrees(percentage);
      const textAngle = (angle * 2 + incrementAngle) / 2;
      angle += incrementAngle;

      const [x, y] = polarToCartesian(centerX, centerY, radius, angle);
      const endPoint: Point = { x, y };
      const fillColor =
        index < colorArr.length
          ? colorArr[index]
          : colorArr[Math.floor(Math.random() * colorArr.length)];
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

  const sectors = drawSectors();
  return (
    <>
      <button onClick={() => setSeed(Math.random())}> ROLL </button>
      {winner && <h1>Winner is {winner.name}</h1>}
      <svg width={WIDTH} height={HEIGHT}>
        {sectors.map((sector) => sector)}
      </svg>
    </>
  );
};
