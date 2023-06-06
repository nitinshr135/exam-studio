"use client";

import { UseModal } from "@/hooks/modal-context";
import { UsePaper } from "@/hooks/paper-context";
import { UseTimer } from "@/hooks/timer-context";
import { useEffect, useState } from "react";

interface INavbarExam {
  attemptedNo: number;
  unattemptedNo: number;
}

const NavbarExam = ({ attemptedNo, unattemptedNo }: INavbarExam) => {
  const { selectedExam } = UsePaper();
  const { setModalOpen, setModalType, setModalOption } = UseModal();

  const { timerDurationInSecs, startTimer } = UseTimer();

  const initialMinutes = 60;
  const initialSeconds = 0;

  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  return (
    <div
      className="backdrop-blur-2xl fixed left-0 top-0 w-full py-6 px-6 lg:px-12 border-b border-gray-300
          flex justify-between items-center flex-col lg:flex-row gap-6 z-20"
    >
      <p className="font-semibold">{!!selectedExam ? selectedExam.name : ""}</p>
      {startTimer && (
        <p className="font-medium text-sm">
          Time Remaining:
          {timerDurationInSecs < 10
            ? `0${timerDurationInSecs}`
            : timerDurationInSecs}{" "}
          seconds
        </p>
      )}
      <button
        className="px-10 bg-red-500 h-9 rounded-3xl shadow-sm text-white
        font-medium hover:opacity-90 ease-in-out flex flex-row gap-3 justify-between items-center"
        onClick={() => {
          setModalType("submitExam");
          setModalOption({ attemptedNo, unattemptedNo });
          setModalOpen(true);
        }}
      >
        End Exam
      </button>
    </div>
  );
};

export default NavbarExam;
