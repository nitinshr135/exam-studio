import { useRouter } from "next/router";

interface IInstructionProps {
  isDisabled: boolean;
}

const Instructions = ({ isDisabled }: IInstructionProps) => {
  const { query, push } = useRouter();
  return (
    <div className="flex flex-col items-center justify-center w-full h-full mt-24">
      <h2 className="font-bold text-2xl">Online Exam Instructions</h2>
      <ol className="flex flex-col gap-3 my-8 text-base font-medium w-full text-center">
        <li>
          - Ensure you have a stable internet connection before starting the
          exam.
        </li>
        <li>- Answer all the questions within the specified time limit.</li>
        <li>
          - Click the <b>Submit</b> button at the end of the exam to submit your
          answers.
        </li>
        <li>
          - Avoid refreshing the page or navigating away from the exam during
          the test.
        </li>
        <li>
          - Do not use any external resources or communication devices during
          the exam.
        </li>
        <li>
          - Once you start the exam, the timer will begin, and you cannot pause
          or restart it.
        </li>
      </ol>
      <p className="font-bold text-2xl">Good luck with your exam!</p>
      <button
        className="mt-8 px-8 h-9 bg-[#0D99FF] rounded-3xl shadow-sm
            text-white font-medium hover:opacity-90 ease-in-out
              disabled:opacity-80 disabled:cursor-not-allowed"
        onClick={() => push(`/exam-hall/${query.examId}?start=true`)}
        disabled={isDisabled}
      >
        Start Exam
      </button>
    </div>
  );
};

export default Instructions;
