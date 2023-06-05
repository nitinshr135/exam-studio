import { databases } from "@/appwrite/appwriteConfig";
import MultipleChoiceQuestion from "@/components/multiple-choice-question";
import NavbarExam from "@/components/navbars/navbar-exam";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ExamHall() {
  const { query } = useRouter();
  const [questions, setQuestions] = useState<any>(); // Question set for the examination
  const [totalMarks, setTotalMarks] = useState<number>(0); // Total marks obtained
  console.log("YEE TOTAL MARKS --", totalMarks);

  var marksHashmap: Map<number, number> = new Map();

  // Load the examination questions once we are in the examination page
  const loadExaminationQuestions = async (collectionId: string) => {
    let promise = databases.listDocuments(
      "647cccd637b162c557f3",
      collectionId
      // [Query.equal("title", "Avatar")]
    );

    promise.then(
      function (response) {
        setQuestions(response.documents);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    loadExaminationQuestions(query.slug as string);
  }, [query.slug]);

  const handleMarksObtained = (i: number, mark: number) => {
    // using HASH MAP to set a track of questions vs marks, and to get a precise total marks
    marksHashmap.set(i, mark);
  };

  const handleSubmit = () => {
    let sum = 0;
    marksHashmap.forEach((mark) => {
      sum += mark;
    });
    console.log("YEE MARK --", sum);
  };

  return (
    <>
      <NavbarExam />
      <div className="flex flex-col gap-10 w-full">
        <div className="flex flex-col gap-10">
          {questions?.map((question: any, i: number) => (
            <MultipleChoiceQuestion
              key={i}
              sequence={++i}
              questionText={question.ques}
              choices={question.options}
              isMultiSelect={question.isMultiChoice}
              answer={question.answer}
              positiveMark={question.mark}
              negativeMark={question.negativeMark}
              markObtained={handleMarksObtained}
            />
          ))}
        </div>

        <div className="mt-12 w-full flex items-center justify-center">
          <button
            className="px-10 bg-[#0D99FF] h-9 rounded-3xl shadow-sm text-white
          font-medium hover:opacity-90 ease-in-out"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
