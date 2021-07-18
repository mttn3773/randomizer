import React, { useEffect, useMemo, useState } from "react";
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
  const [winner, setWinner] = useState<INormalizedItem | null>(null);
  const [animate, setAnimate] = useState<boolean>(false);
  const [totalAngle, setTotalAngle] = useState<number>(0);
  const wheelRef = useRef<SVGSVGElement | null>(null);
  const drawSectors = (): JSX.Element[] => {
    const resultArr: JSX.Element[] = [];
    let startPoint: Point = { x: centerX, y: 0 };
    let angle = -90;
    normalizedItemsList.forEach(({ percentage, name }, index) => {
      if (!percentage) return;
      const incrementAngle = converPercantageToDegrees(percentage);
      const textAngle = (angle * 2 + incrementAngle) / 2;
      angle += incrementAngle;
      const [x, y] = polarToCartesian(centerX, centerY, radius, angle);
      const endPoint: Point = { x, y };
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
  const handleAnimation = () => {
    setAnimate(true);
    const seed = Math.random();
    const offset = totalAngle - Math.ceil(totalAngle / 360) * 360;
    const newAngle = totalAngle + calculateSpinAngle(seed, offset);
    setTotalAngle(newAngle);
    const winner = defineWinner(seed, normalizedItemsList);
    gsap
      .timeline({
        onComplete: () => {
          setWinner(winner);
          setAnimate(false);
        },
      })
      .to(wheelRef.current, { rotate: newAngle, duration: 5 });
  };

  const sectors = drawSectors();
  console.log(sectors);

  return (
    <section>
      <div
        className="wheel-conteiner"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          zIndex: 999,
        }}
      >
        <div
          className="selector-conteiner"
          style={{ position: "absolute", top: 0 }}
        >
          <svg width="40" height="60">
            <path d="M 20 0 L 0 30 L 40 30" />
          </svg>
        </div>
        <svg ref={wheelRef} width={WIDTH} height={HEIGHT}>
          {sectors.map((sector) => sector)}
        </svg>
      </div>
      <div className="winner-info">
        {<h1>Winner is {winner && !animate ? winner.name : "..."}</h1>}
        <button disabled={animate} onClick={handleAnimation}>
          ROLL
        </button>
      </div>
    </section>
  );
};
