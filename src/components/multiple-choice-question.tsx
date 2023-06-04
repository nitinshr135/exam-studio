"use client";

import { useState } from "react";
import ChoiceButton from "./choice-button";

interface IMultipleChoiceQuestion {
  sequence: number;
  questionText: string;
  choices: string[];
  isMultiSelect: boolean;
}

const MultipleChoiceQuestion = ({
  sequence,
  questionText,
  choices,
  isMultiSelect,
}: IMultipleChoiceQuestion) => {
  const [effect, setEffect] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <p>
        {sequence}. {questionText}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {choices.map((choice, i) => (
          <ChoiceButton key={i} choice={choice} />
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
