import { Point } from './../components/SVGWheel/SVGWheel';
export const converPercantageToDegrees = (percentage: number) => {
  if (percentage > 100 || percentage < 0) return 0;
  return (360 / 100) * percentage;
};

export const convertAngleToRadians = (angleInDegrees: number) => {
  return (angleInDegrees * Math.PI) / 180;
};

export const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angle: number
): Point => {
  angle = convertAngleToRadians(angle);
  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);
  return {x, y};
};
