"use client";

import { UsePaper } from "@/hooks/PaperContext";
import { UseUser } from "@/hooks/UserContext";
import { useEffect, useState } from "react";

const NavbarExam = () => {
  const { selectedExaminationPaper } = UsePaper();

  const initialMinutes = 60;
  const initialSeconds = 0;

  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let totalSeconds = initialMinutes * 60 + initialSeconds;

    const interval = setInterval(() => {
      totalSeconds--;

      const remainingMinutes = Math.floor(totalSeconds / 60);
      const remainingSeconds = totalSeconds % 60;

      if (remainingMinutes === 0 && remainingSeconds === 0) {
        clearInterval(interval);
      }

      setMinutes(remainingMinutes);
      setSeconds(remainingSeconds);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [initialMinutes, initialSeconds]);

  return (
    <div
      className="backdrop-blur-2xl fixed left-0 top-0 w-full py-6 px-6 lg:px-12 border-b border-gray-300
          flex justify-between items-center flex-col lg:flex-row gap-6 z-20"
    >
      <p className="font-medium">{selectedExaminationPaper}</p>
      <p className="font-medium text-sm">
        Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </p>
      <button
        className="px-10 bg-red-500 h-9 rounded-3xl shadow-sm text-white
        font-medium hover:opacity-90 ease-in-out flex flex-row gap-3 justify-between items-center"
        onClick={() => null}
      >
        End Exam
      </button>
    </div>
  );
};

export default NavbarExam;
