import MultipleChoiceQuestion from "@/components/multiple-choice-question";

export default function ExamHall() {
  const questionText =
    "What is the capital city of India - The Superpower of the World?";
  const choices = ["Kolkata", "New Delhi", "Bengaluru", "Mumbai"];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-32 lg:py-24 px-6 lg:px-12 bg-[#6096B4]">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div
          className="backdrop-blur-2xl fixed left-0 top-0 w-full py-6 px-6 lg:px-12 border-b border-gray-300
          flex justify-between flex-col lg:flex-row gap-6"
        >
          <p className="">Name of the Exam</p>
          <p className="">Time Remaining: 00:00:69 secs</p>
        </div>

        <div className="flex flex-col gap-10">
          <MultipleChoiceQuestion
            sequence={1}
            questionText={questionText}
            choices={choices}
            isMultiSelect={false}
          />
          <MultipleChoiceQuestion
            sequence={2}
            questionText={questionText}
            choices={choices}
            isMultiSelect={false}
          />
          <MultipleChoiceQuestion
            sequence={3}
            questionText={questionText}
            choices={choices}
            isMultiSelect={false}
          />
        </div>
      </div>

      <div className="mt-12 w-full flex items-center justify-center">
        <button>Submit</button>
      </div>
    </main>
  );
}
