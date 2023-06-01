"use client";

import { useState } from "react";

interface IChoiceButton {
  choice: string;
}

const ChoiceButton = ({ choice }: IChoiceButton) => {
  const [effect, setEffect] = useState(false);
  const [selected, setSelected] = useState(false);
  return (
    <button
      className={`${
        effect && "animate-click"
      } p-2 text-center rounded-lg cursor-pointer
        border border-white hover:opacity-90
        ${selected ? "bg-[#93B0CF]" : "bg-[#93BFCF]"}`}
      onClick={() => {
        setEffect(true);
        setSelected(!selected);
      }}
      onAnimationEnd={() => setEffect(false)}
    >
      {choice}
    </button>
  );
};

export default ChoiceButton;
