"use client";

import { useRouter } from "next/router";
import { useState } from "react";

interface IChoiceButton {
  choice: string;
}

const ChoiceButton = ({ choice }: IChoiceButton) => {
  const { push } = useRouter();

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
        push("/exam-hall");
      }}
      onAnimationEnd={() => setEffect(false)}
    >
      {choice}
    </button>
  );
};

export default ChoiceButton;
