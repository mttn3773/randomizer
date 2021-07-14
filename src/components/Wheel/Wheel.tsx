import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Chart, ChartItem } from "chart.js";
import "./Wheel.scss";
interface WheelProps {}
type Point = {
  x: number;
  y: number;
};
export const Wheel: React.FC<WheelProps> = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    drawCIrcle();
  }, [canvasRef.current]);
  const calculateAngle = (startPosition: number, percent: number) => {
    return startPosition + (Math.PI * 2 * percent) / 100;
  };
  const drawCIrcle = () => {
    canvasRef.current!.width = 600;
    canvasRef.current!.height = 600;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !canvasRef.current) return;
    const center: Point = {
      x: canvasRef.current.width / 2,
      y: canvasRef.current.height / 2,
    };
    const radius = canvasRef.current.width / 2;
    const colors = ["red", "blue", "coral", "purple", "teal"];
    let startPositon = -Math.PI / 2;
    let endPosition = calculateAngle(startPositon, 5);
    ctx.lineWidth = 3;
    let percent = 5;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(center.x, center.y, radius, startPositon, endPosition);
      ctx.lineTo(center.x, center.y);
      ctx.closePath();
      ctx.fillStyle = colors[i];
      ctx.fill();
      startPositon = endPosition;
      endPosition = calculateAngle(startPositon, (percent += 5));
      ctx.stroke();
    }
    ctx.rotate(90);
  };
  return <canvas style={{ backgroundColor: "#efefef" }} ref={canvasRef} />;
};
