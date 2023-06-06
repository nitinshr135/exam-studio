import React, { useContext } from "react";
import { UseModal } from "@/hooks/modal-context";
import LoginButton from "../Button/login-button";
import { UseTimer } from "@/hooks/timer-context";

const SubmitExamModal = () => {
  const { setModalOpen, modalOption } = UseModal();
  const { timerDurationInSecs, startTimer } = UseTimer();

  const handleClose = (e: any) => {
    if (e.target.classList.contains("modal")) {
      setModalOpen(false);
    }
  };

  return (
    <div
      className="fixed z-30 left-0 top-0 w-full h-full
     overflow-auto bg-black bg-opacity-60
     flex items-center justify-center modal"
      onClick={(e) => handleClose(e)}
    >
      <div
        className="p-6 w-4/5 md:w-2/5 bg-white shadow-md rounded-xl
      flex flex-col gap-6 text-center"
      >
        <h2 className="font-bold text-xl">
          Are you sure want to end the examination?
        </h2>
        <div className="flex flex-col gap-4 font-medium items-center justify-center">
          <p className="flex flex-row gap-1">
            Attempted questions -{" "}
            <h3 className="text-green-500">{modalOption.attemptedNo}</h3>
          </p>
          <p className="flex flex-row gap-1">
            Unattempted questions -{" "}
            <h3 className="text-red-500">{modalOption.unattemptedNo}</h3>
          </p>
        </div>
        {startTimer && (
          <h3 className="font-bold text-lg">
            Time left - {timerDurationInSecs} seconds
          </h3>
        )}
        <div className="flex flex-row gap-12 justify-center">
          <button
            className="px-10 bg-white border border-gray-500 h-9 rounded-full shadow-sm
          font-medium ease-in-out hover:border-black"
            onClick={() => setModalOpen(false)}
          >
            Go Back
          </button>
          <button
            className="px-10 bg-red-500 h-9 rounded-3xl shadow-sm text-white
          font-medium hover:opacity-90 ease-in-out w-max"
            onClick={() => null}
          >
            Yes, End Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitExamModal;
