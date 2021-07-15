import React from "react";
import { useState } from "react";
import {
  converPercantageToDegrees,
  convertAngleToRadians,
  polarToCartesian,
} from "../../utils/drawCircle";
import { Point } from "../SVGWheel/SVGWheel";
import "./WheelSector.scss";

interface WheelSectorProps {
  centerX: number;
  centerY: number;
  radius: number;
  startPoint: Point;
  endPoint: Point;
  fillColor: string;
  largeArcFlag: boolean;
  angle: number;
}
export const WheelSector: React.FC<WheelSectorProps> = ({
  centerX,
  centerY,
  startPoint,
  endPoint,
  radius,
  fillColor,
  largeArcFlag,
  angle,
}) => {
  const rad = convertAngleToRadians(angle);
  const textX = centerX + radius * Math.cos(rad) * 0.5;
  const textY = centerY + radius * Math.sin(rad) * 0.5;
  return (
    <svg>
      <path
        className="sector"
        d={`M ${centerX}, ${centerY} 
           L ${startPoint.x}, ${startPoint.y} 
           A ${radius}, ${radius}, 1, ${largeArcFlag ? 1 : 0}, 1, ${
          endPoint.x
        }, ${endPoint.y}
      `}
        fill={fillColor}
      />
      <text
        dominantBaseline="middle"
        textAnchor="middle"
        transform={`translate(${textX}, ${textY})rotate(${angle})`}
      >
        Hello
      </text>
    </svg>
  );
};
