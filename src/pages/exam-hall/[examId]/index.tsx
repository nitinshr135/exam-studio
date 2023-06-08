import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { databases } from "@/appwrite/appwriteConfig";
import Instructions from "@/components/instructions";
import MultipleChoiceQuestion from "@/components/multiple-choice-question";
import NavbarExam from "@/components/Navbar/navbar-exam";
import { UseModal } from "@/hooks/modal-context";
import { UseTimer } from "@/hooks/timer-context";
import { v4 as uuidv4 } from "uuid";
import { UseUser } from "@/hooks/user-context";
import { UsePaper } from "@/hooks/paper-context";

export default function ExamHall() {
  const { query, push } = useRouter();
  const { setStartTimer, setTimerDurationInSecs } = UseTimer();
  const { setModalOpen, setModalType, setModalOption } = UseModal();
  const { selectedExam } = UsePaper();
  const { user } = UseUser();

  const [questions, setQuestions] = useState<any>(); // Question set for the examination

  const [attemptedNmber, setAttemptedNumber] = useState<number>(0);
  const [unattemptedNmber, setUnattemptedNumber] = useState<number>(0);

  var marksHashmap: Map<number, { attempted: boolean; mark: number }> =
    new Map();
  const [answers, setAnswers] = useState<Map<number, number>>(new Map());

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

  const handleSubmit = async () => {
    if (!!user) {
      const promise = databases.createDocument(
        "647cccd637b162c557f3",
        "6480edbcf330b7e4ad83",
        uuidv4(),
        {
          examId: query.examId,
          userId: user.$id,
          marksObtained: 83.4,
          attempted: 26,
          unattempted: 24,
          totalMarks: 100,
        }
      );

      promise.then(
        function (response) {
          console.log(response);
          push(`/exam-hall/${query.examId}/result`);
        },
        function (error) {
          console.log(error);
        }
      );
    }
  };

  useEffect(() => {
    loadExaminationQuestions(query.examId as string);
  }, [query.examId]);

  // COunt the number of attempted/unattempted questions
  const countElementsWithZero = (hashmap: any) => {
    let count = 0;

    for (const [key, value] of hashmap) {
      console.log("YEE ATTAMPTED --", key, value);
      if (value.attempted) count++;
    }

    setAttemptedNumber(count);
    setUnattemptedNumber(questions.length - count);
  };

  const handleMarksObtained = (i: number, mark: number, attempted: boolean) => {
    // using HASH MAP to set a track of questions vs marks, and to get a precise total marks
    marksHashmap.set(i, { attempted, mark });
    console.log("YEE marksHashmap", marksHashmap);
    countElementsWithZero(marksHashmap);
  };

  const countMarks = () => {
    let sum = 0;
    marksHashmap.forEach((attempt) => {
      sum += attempt.mark;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavbarExam
        attemptedNo={attemptedNmber}
        unattemptedNo={unattemptedNmber}
      />
      {(query.start as string) === "false" ? (
        <Instructions isDisabled={!questions} />
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
