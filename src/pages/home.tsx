import Navbar from "@/components/Navbar/navbar";
import { useRouter } from "next/router";
import Image from "next/image";
import RightIconBlack from "@/assets/icons/right-arrow-black.svg";
import { UsePaper } from "@/hooks/paper-context";
import { useState } from "react";
import InputText from "@/components/InputField/input-text";
import { databases } from "@/appwrite/appwriteConfig";
import { v4 as uuidv4 } from "uuid";
import { UseUser } from "@/hooks/user-context";

export default function Home() {
  const { push } = useRouter();
  const { examinationPapers, setSelectedExam } = UsePaper();

  const { user } = UseUser();

  const selfCreatedExams = () =>
    examinationPapers?.filter((paper) => paper.createdBy === user?.$id);

  const globalExams = () =>
    examinationPapers?.filter((paper) => paper.createdBy !== user?.$id);

  const [showExamNameInput, setShowExamNameInput] = useState<boolean>(false);
  const [newExamName, setNewExamName] = useState<string>("");

  const handleCreateTest = () => {
    if (!!newExamName) {
      const promise = databases.createDocument(
        "647cccd637b162c557f3",
        "647cf4bf200f3913bdfc",
        uuidv4(),
        {
          examName: newExamName,
          createdBy: user?.$id,
        }
      );

      promise.then(
        function (response) {
          console.log(response);
          push(`/create-test/${response?.$id}`);
        },
        function (error) {
          console.log(error);
        }
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-full mt-10 flex flex-col sm:flex-row">
        <div className="lg:w-2/3 flex flex-col text-left gap-12">
          {selfCreatedExams()?.length! > 0 && (
            <>
              <h1 className="font-bold text-3xl text-[#FFFAF0]">
                Created by You
              </h1>
              {selfCreatedExams()?.map((paper, i) => (
                <div
                  key={i}
                  className="bg-white w-full h-12 rounded-3xl
            flex justify-between items-center px-8 gap-5
            cursor-pointer shadow-sm ease-in-out duration-150
            hover:shadow-2xl hover:-translate-y-2 hover:translate-x-2
            hover:bg-slate-100 border border-gray-600"
                  onClick={() => {
                    push(`/exam-hall/${paper.collectionId}?start=false`);
                    setSelectedExam(paper);
                  }}
                >
                  <h1 className="text-lg font-medium">
                    {i + 1}. {paper.name}
                  </h1>
                  <Image
                    src={RightIconBlack}
                    width={18}
                    height={10}
                    alt="visit"
                  />
                </div>
              ))}
            </>
          )}
          {globalExams()?.length! > 0 && (
            <>
              <h1 className="font-bold text-3xl text-[#FFFAF0]">
                Global Tests
              </h1>
              {globalExams()?.map((paper, i) => (
                <div
                  key={i}
                  className="bg-white w-full h-12 rounded-3xl
            flex justify-between items-center px-8 gap-5
            cursor-pointer shadow-sm ease-in-out duration-150
            hover:shadow-2xl hover:-translate-y-2 hover:translate-x-2
            hover:bg-slate-100 border border-gray-600"
                  onClick={() => {
                    push(`/exam-hall/${paper.collectionId}?start=false`);
                    setSelectedExam(paper);
                  }}
                >
                  <h1 className="text-lg font-medium">
                    {i + 1}. {paper.name}
                  </h1>
                  <Image
                    src={RightIconBlack}
                    width={18}
                    height={10}
                    alt="visit"
                  />
                </div>
              ))}
            </>
          )}
        </div>
        <div
          className="lg:w-1/3 mt-8 lg:mt-20 h-max p-12 lg:ml-8 duration-200
        bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-2xl"
        >
          <div className="text-5xl lg:w-5/6 mb-8 text-left leading-normal font-semibold text-white">
            <p className="break-words">
              Create and share custom tests with your groups with ExamStudio!
            </p>
          </div>
          {showExamNameInput ? (
            <div className="flex flex-row gap-4 items-center">
              <InputText
                classname="bg-white h-12 rounded-2xl w-full text-black font-medium"
                text={newExamName}
                setText={setNewExamName}
                placeholder="Name of the test"
              />
              <div
                className="bg-white hover:bg-slate-100 rounded-full
              flex items-center justify-center h-10 w-10 shrink-0 cursor-pointer"
                onClick={() => handleCreateTest()}
              >
                <Image src={RightIconBlack} width={14} height={10} alt="next" />
              </div>
            </div>
          ) : (
            <button
              className="px-8 bg-white h-12 rounded-3xl shadow-sm text-black
          font-semibold hover:opacity-90 ease-in-out
          flex items-center justify-center gap-2 w-full
          text-xl"
              onClick={() => setShowExamNameInput(true)}
            >
              Create new Test
            </button>
          )}
        </div>
      </div>
    </>
  );
}
