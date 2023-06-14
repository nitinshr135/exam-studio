import React from "react";

const TimeConverter = ({ seconds }: { seconds: number }) => {
  const convertSecondsToTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  const formattedTime = convertSecondsToTime(seconds);

  return <>{formattedTime}</>;
};

export default TimeConverter;
