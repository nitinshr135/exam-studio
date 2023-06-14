"use client";

import { useEffect, useState } from "react";
import ChoiceButton from "../Button/choice-button";

interface IMultipleChoiceQuestion {
  sequence: number;
  questionText: string;
  choices: string[];
  isMultiSelect: boolean;
  answer: string[];
  positiveMark: number;
  negativeMark: number;
  markObtained: (i: number, mark: number, attempted: boolean) => void;
  totalMarks: number;
  setMarkObtained: (mark: any) => void;
}

const MultipleChoiceQuestion = ({
  sequence,
  questionText,
  choices,
  isMultiSelect,
  answer,
  positiveMark,
  negativeMark,
  markObtained,
  totalMarks,
  setMarkObtained,
}: IMultipleChoiceQuestion) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string[] | null>(null);
  const [mark, setMark] = useState<number>(0);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleAddAnswer = (newString: string) => {
    setIsClicked(true);
    if (!isMultiSelect) setSelectedAnswer([newString]);
    else {
      const updatedAnswers = !selectedAnswer
        ? [newString]
        : [...selectedAnswer, newString];
      setSelectedAnswer(updatedAnswers);
    }
  };

  const handleDeleteAnswer = (stringToDelete: string) => {
    const updatedAnswers = !!selectedAnswer
      ? selectedAnswer.filter((str) => str !== stringToDelete)
      : [];
    setSelectedAnswer(updatedAnswers);
  };

  // To grant positive marks if the selected answer(s) are correct and negative marks if otherwise
  useEffect(() => {
    if (!!selectedAnswer?.length)
      JSON.stringify(selectedAnswer?.sort()) === JSON.stringify(answer?.sort())
        ? markObtained(sequence, positiveMark, !!selectedAnswer)
        : markObtained(sequence, -negativeMark, !!selectedAnswer);
    else markObtained(sequence, 0, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAnswer]);

  // To grant positive marks if the selected answer(s) are correct and negative marks if otherwise
  // useEffect(() => {
  //   const isAnswerCorrect =
  //     JSON.stringify(selectedAnswer?.sort()) === JSON.stringify(answer?.sort());

  //   if (isAnswerCorrect) {
  //     if (mark === positiveMark) setMarkObtained(totalMarks);
  //     if (mark === negativeMark)
  //       setMarkObtained(negativeMark + positiveMark + totalMarks);
  //     else
  //       isAnswerCorrect
  //         ? setMarkObtained(positiveMark + totalMarks)
  //         : setMarkObtained(negativeMark + totalMarks);
  //   }
  //   if (!isAnswerCorrect) {
  //     if (mark === positiveMark)
  //       setMarkObtained(negativeMark + totalMarks - positiveMark);
  //     if (mark === negativeMark) setMarkObtained(totalMarks);
  //     else
  //       isAnswerCorrect
  //         ? setMarkObtained(positiveMark + totalMarks)
  //         : setMarkObtained(negativeMark + totalMarks);
  //   }
  //   isAnswerCorrect ? setMark(positiveMark) : setMark(negativeMark);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedAnswer]);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-base font-medium text-white">
        Q{sequence}. {questionText}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:w-1/2 gap-6">
        {choices.map((choice, i) => (
          <ChoiceButton
            key={i}
            choice={choice}
            isMultiSelect={isMultiSelect}
            selectedAnswer={selectedAnswer}
            onAddAnswer={handleAddAnswer}
            onDeleteAnswer={handleDeleteAnswer}
          />
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
