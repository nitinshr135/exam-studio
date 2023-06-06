import { databases } from "@/appwrite/appwriteConfig";
import Instructions from "@/components/instructions";
import MultipleChoiceQuestion from "@/components/multiple-choice-question";
import NavbarExam from "@/components/Navbar/navbar-exam";
import { UseModal } from "@/hooks/modal-context";
import { UseTimer } from "@/hooks/timer-context";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ExamHall() {
  const { query } = useRouter();
  const { setStartTimer, setTimerDurationInSecs } = UseTimer();
  const { setModalOpen, setModalType, setModalOption } = UseModal();

  const [questions, setQuestions] = useState<any>(); // Question set for the examination

  const [attemptedNmber, setAttemptedNumber] = useState<number>(0);
  const [unattemptedNmber, setUnattemptedNumber] = useState<number>(0);

  var marksHashmap: Map<number, number> = new Map();

  // Load the examination questions once we are in the examination page
  const loadExaminationQuestions = async (collectionId: string) => {
    let promise = databases.listDocuments("647cccd637b162c557f3", collectionId);

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

  // COunt the number of attempted/unattempted questions
  const countElementsWithZero = (hashmap: any) => {
    let count = 0;

    for (const [value, key] of hashmap) {
      if (value !== 0) count++;
    }

    setAttemptedNumber(count);
    setUnattemptedNumber(questions.length - count);
  };

  const handleMarksObtained = (i: number, mark: number) => {
    // using HASH MAP to set a track of questions vs marks, and to get a precise total marks
    marksHashmap.set(i, mark);

    const count = countElementsWithZero(marksHashmap);
  };

  const handleSubmit = () => {
    let sum = 0;
    marksHashmap.forEach((mark) => {
      sum += mark;
    });
  };

  useEffect(() => {
    if ((query.start as string) === "true") {
      setStartTimer(true);
      setTimerDurationInSecs(5400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "Are you sure"; // This is necessary for Chrome
      setModalType("submitExam");
      setModalOption({ attemptedNmber, unattemptedNmber });
      setModalOpen(true);
    };

    const handleRefresh = (event: KeyboardEvent) => {
      if (event.code === "F5" || (event.ctrlKey && event.code === "KeyR")) {
        event.preventDefault();
        setModalType("submitExam");
        setModalOption({ attemptedNmber, unattemptedNmber });
        setModalOpen(true);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("keydown", handleRefresh);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleRefresh);
    };
  }, []);

  return (
    <>
      <NavbarExam
        attemptedNo={attemptedNmber}
        unattemptedNo={unattemptedNmber}
      />
      {(query.start as string) === "false" ? (
        <Instructions />
      ) : (
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
      )}
    </>
  );
}
