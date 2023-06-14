import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { databases } from "@/appwrite/appwriteConfig";
import NavbarExam from "@/components/Navbar/navbar-exam";
import { UseModal } from "@/hooks/modal-context";
import { UseTimer } from "@/hooks/timer-context";
import { Query } from "appwrite";
import config from "@/config";
import Instructions from "@/components/Misc/instructions";
import MultipleChoiceQuestion from "@/components/Misc/multiple-choice-question";

export default function ExamHall() {
  const { query } = useRouter();
  const { setStartTimer, timerDurationInSecs } = UseTimer();
  const { setModalOpen, setModalType, setModalOption } = UseModal();

  const [questions, setQuestions] = useState<any>(); // Question set for the examination

  const [marksMap, setMarksMap] = useState(new Map());

  // Load the examination questions once we are in the examination page
  const loadExaminationQuestions = async (collectionId: string) => {
    let promise = databases.listDocuments(
      config.appwrite.PROJECT_ID,
      config.appwrite.QUESTION_BANK_ID,
      [Query.equal("examID", collectionId)]
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
    loadExaminationQuestions(query.examId as string);
  }, [query.examId]);

  const handleMarksObtained = (i: number, mark: number, attempted: boolean) => {
    // using HASH MAP to set a track of questions vs marks, and to get a precise total marks
    setMarksMap(
      (map) => new Map(map.set(i, { mark: mark, attempted: attempted }))
    );
  };

  const countMarks = () => {
    let sum = 0;
    marksMap.forEach((attempt) => {
      sum += attempt.mark;
    });
    return sum;
  };

  const countAttemptedNumber = () => {
    let count = 0;
    marksMap.forEach((attempt) => {
      if (!!attempt.attempted) count++;
    });
    return { attempted: count, unattemptedNmber: questions?.length - count };
  };

  const countTotalMarks = () => {
    let sum = 0;
    questions?.forEach((question: any) => {
      sum += question?.mark;
    });
    return sum;
  };

  useEffect(() => {
    if ((query.start as string) === "true") {
      setStartTimer(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    // To handle exam submit when the browser is reloaded
    if ((query.start as string) === "true") {
      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
        event.returnValue = "Are you sure";
        setModalType("submitExam");
        setModalOption({
          attemptedNo: countAttemptedNumber().attempted,
          unattemptedNo: countAttemptedNumber().unattemptedNmber,
          marks: countMarks(),
          totalMarks: countTotalMarks(),
        });
        setModalOpen(true);
      };

      const handleRefresh = (event: KeyboardEvent) => {
        if (event.code === "F5" || (event.ctrlKey && event.code === "KeyR")) {
          event.preventDefault();
          setModalType("submitExam");
          setModalOption({
            attemptedNo: countAttemptedNumber().attempted,
            unattemptedNo: countAttemptedNumber().unattemptedNmber,
            marks: countMarks(),
            totalMarks: countTotalMarks(),
          });
          setModalOpen(true);
        }
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("keydown", handleRefresh);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("keydown", handleRefresh);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    setModalType("submitExam");
    setModalOption({
      attemptedNo: countAttemptedNumber().attempted,
      unattemptedNo: countAttemptedNumber().unattemptedNmber,
      marks: countMarks(),
      totalMarks: countTotalMarks(),
    });
    setModalOpen(true);
  };

  useEffect(() => {
    if (timerDurationInSecs === 1) handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerDurationInSecs]);

  return (
    <>
      <NavbarExam
        attemptedNo={countAttemptedNumber().attempted}
        unattemptedNo={countAttemptedNumber().unattemptedNmber}
        totalMarks={countTotalMarks()}
        marks={countMarks()}
      />
      {(query.start as string) === "false" ? (
        <Instructions isDisabled={!questions} />
      ) : (
        <div className="flex flex-col gap-10 w-full mt-16 lg:mt-6">
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

          <div className="mt-4 w-full flex items-center justify-center">
            <button
              className="px-10 bg-[#0D99FF] h-9 rounded-3xl shadow-sm text-white
          font-medium hover:opacity-90 ease-in-out"
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}
