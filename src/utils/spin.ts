export const calculateSpinAngle = (seed: number, offset: number) => {
  return 1080 + (360 - seed * 360) - offset;
};
