"use client";

import { useEffect, useState } from "react";

interface IChoiceButton {
  choice: string;
  selectedAnswer: string[] | null;
  isMultiSelect: boolean;
  onAddAnswer: (newString: string) => any;
  onDeleteAnswer: (stringToDelete: string) => any;
}

const ChoiceButton = ({
  choice,
  selectedAnswer,
  isMultiSelect,
  onAddAnswer,
  onDeleteAnswer,
}: IChoiceButton) => {
  const [selected, setSelected] = useState(false);

  const handleChoiceClick = () => {
    if (!!selectedAnswer?.find((answer) => answer === choice)) {
      onDeleteAnswer(choice);
      setSelected(false);
    } else {
      onAddAnswer(choice);
      setSelected(true);
    }
  };

  // To select another option if the question is single option correct type
  useEffect(() => {
    if (!isMultiSelect) {
      if (!!selectedAnswer?.find((answer) => answer === choice)) {
        setSelected(true);
      } else setSelected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAnswer]);

  return (
    <button
      className={`animate-click p-2 text-center rounded-lg cursor-pointer
        border hover:opacity-90
        ${
          selected
            ? "bg-black text-white border-white scale-95 z-0"
            : "bg-white border-black"
        }`}
      onClick={handleChoiceClick}
    >
      {choice}
    </button>
  );
};

export default ChoiceButton;
