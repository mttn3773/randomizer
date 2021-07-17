import React from "react";
import { convertAngleToRadians } from "../../utils/drawCircle";
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
  percantage: number;
  text?: string;
}
export const WheelSector: React.FC<WheelSectorProps> = ({
  percantage,
  centerX,
  centerY,
  startPoint,
  endPoint,
  radius,
  fillColor,
  largeArcFlag,
  angle,
  text,
}) => {
  if (!percantage) return null;
  const rad = convertAngleToRadians(angle);
  const textX = centerX + radius * Math.cos(rad) * 0.5;
  const textY = centerY + radius * Math.sin(rad) * 0.5;
  let arcFlag = largeArcFlag ? 1 : 0;
  const calculateFontSize = () => {
    if (percantage > 10) return 20;
    return (20 / 100) * percantage * 10;
  };
  const circle = (
    <circle cx={centerX} cy={centerY} r={radius} fill={fillColor} />
  );
  const sector = (
    <path
      className="sector"
      strokeWidth={2}
      stroke="black"
      d={`M ${centerX}, ${centerY} 
     L ${startPoint.x}, ${startPoint.y} 
     A ${radius}, ${radius}, 1, ${arcFlag}, 1, ${endPoint.x}, ${endPoint.y}
`}
      fill={fillColor}
    />
  );
  return (
    <svg>
      {percantage === 100 ? circle : sector}
      <text
        fontSize={calculateFontSize()}
        dominantBaseline="middle"
        textAnchor="middle"
        transform={`translate(${textX}, ${textY})rotate(${angle})`}
        stroke="#efefef"
        style={{
          letterSpacing: "0.05em",
          fontWeight: "bold",
          textShadow:
            "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
        }}
      >
        {text}
      </text>
    </svg>
  );
};
