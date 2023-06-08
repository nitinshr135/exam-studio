import React from "react";

interface IPercentageWheelProps {
  totalMarks: number;
  correctMarks: number;
}

const CircularPercentageWheel = ({
  correctMarks,
  totalMarks,
}: IPercentageWheelProps) => {
  const percentage = (correctMarks / totalMarks) * 100;
  const circumference = 2 * Math.PI * 50;
  const progress = (circumference * percentage) / 100;
  const remaining = circumference - progress;

  return (
    <>
      <svg width="120" height="120">
        <circle
          r="50"
          cx="60"
          cy="60"
          fill="transparent"
          stroke="#f0f0f0"
          strokeWidth="7"
        />
        <circle
          r="50"
          cx="60"
          cy="60"
          fill="transparent"
          stroke="rgb(34 197 94)"
          strokeWidth="7"
          strokeDasharray={`${progress} ${remaining}`}
          transform="rotate(-90 60 60)"
        />
        <text
          x="50%"
          y="50%"
          font-size="20"
          font-weight="bold"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {percentage.toFixed(1)}%
        </text>
      </svg>
    </>
  );
};

export default CircularPercentageWheel;
