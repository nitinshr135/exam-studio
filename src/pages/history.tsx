import Navbar from "@/components/Navbar/navbar";
import Image from "next/image";
import { useRouter } from "next/router";
import { UsePaper } from "@/hooks/paper-context";
import RightIcon from "@/assets/icons/right-arrow.svg";

export default function History() {
  const { push } = useRouter();
  const { examinationPapers, examHistory, setSelectedExamHistory } = UsePaper();

  const showExamName = (examId: string) => {
    const test = examinationPapers?.find(
      (exam) => exam.collectionId === examId
    );
    return test;
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-full mt-10 flex flex-col sm:flex-row">
        <div className="lg:w-2/3 flex flex-col text-left gap-12">
          <div
            className="flex flex-row gap-2 h-min font-semibold items-center cursor-pointer
            text-white"
            onClick={() => push("/home")}
          >
            <Image
              src={RightIcon}
              className="transform rotate-180 z-0"
              width={15}
              height={15}
              alt="visit"
            />
            Go Home
          </div>
          <h1 className="font-bold text-3xl text-white">Your Test History</h1>
          <div className="w-full px-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {examHistory?.map((exam: any, i: number) => (
              <div
                key={i}
                className="bg-white w-auto h-52 rounded-3xl
                cursor-pointer shadow-sm ease-in-out duration-150
                hover:shadow-xl hover:bg-slate-100 
                border border-gray-600
                p-6 flex flex-col justify-center"
                onClick={() => {
                  push(`/exam-hall/${exam.examId}/result/${exam.resultId}`);
                  setSelectedExamHistory(exam);
                }}
              >
                <p className="text-2xl truncate font-semibold mb-1">
                  {showExamName(exam.examId as string)?.name}
                </p>
                <p className="text-sm font-semibold">id: {exam.examId}</p>
                <p className="my-4 font-medium text-sm">
                  Attempted Date:{" "}
                  {new Date(exam.sumbittedAt).toLocaleDateString("en-us", {
                    hour: "2-digit",
                    minute: "2-digit",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-lg font-semibold">
                  Marks: {exam.marksObtained}/{exam.totalMarks}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
