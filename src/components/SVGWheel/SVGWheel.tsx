import React from "react";
import { useState } from "react";
import {
  converPercantageToDegrees,
  polarToCartesian,
} from "../../utils/drawCircle";
import { WheelSector } from "../WheelSector/WheelSector";

const WIDTH = 300;
const HEIGHT = 300;

export type Point = {
  x: number;
  y: number;
};

interface SVGWheelProps {}

const sectorsArr = [11, 19, 30, 1, 7, 32];
const colorArr = ["red", "blue", "teal", "coral", "purple", "yellow"];

export const SVGWheel: React.FC<SVGWheelProps> = ({}) => {
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;
  const radius = WIDTH / 2;
  const drawSectors = (): JSX.Element[] => {
    const resultArr: JSX.Element[] = [];
    let startPoint: Point = { x: centerX, y: 0 };
    let angle = -90;
    sectorsArr.map((percentage, index) => {
      const incrementAngle = converPercantageToDegrees(percentage);
      const textAngle = (angle * 2 + incrementAngle) / 2;
      angle += incrementAngle;
      const [x, y] = polarToCartesian(centerX, centerY, radius, angle);
      const endPoint: Point = { x, y };
      const largeArcFlag = !!(percentage >= 50);
      const sector = (
        <WheelSector
          key={index}
          centerX={centerX}
          centerY={centerY}
          endPoint={endPoint}
          startPoint={startPoint}
          radius={radius}
          fillColor={colorArr[index]}
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
    <svg width="300px" height="300px">
      <circle cx="150" cy="150" r="150" />
      {sectors.map((sector) => sector)}
    </svg>
  );
};
