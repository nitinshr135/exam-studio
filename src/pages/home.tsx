import { databases } from "@/appwrite/appwriteConfig";
import Navbar from "@/components/navbar";
import { UseUser } from "@/hooks/UserContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RightIcon from "@/assets/icons/right-arrow.svg";
import Image from "next/image";

interface IQuestionPaper {
  examName: string;
  collectionId: string;
}

export default function Home() {
  const { push } = useRouter();
  const { user } = UseUser();

  const [questionPapers, setQuestionPapers] = useState<IQuestionPaper[]>([
    { examName: "UPSC CSE Prelims 2023", collectionId: "647ccce5b97c65e7f561" },
    { examName: "UPSC CDS 2023", collectionId: "647ccce5b97d76e7f561" },
  ]);

  const listQuestions = async () => {
    let promise = databases.listDocuments(
      "647cccd637b162c557f3",
      "647cf33675d0d6a5c6e5"
      // [Query.equal("title", "Avatar")]
    );

    promise.then(
      function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    listQuestions();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col text-left w-full h-full gap-12 mt-10">
        <h1 className="font-bold text-xl mb-2">Global Tests</h1>
        {questionPapers.map((paper, i) => (
          <div
            key={i}
            className="bg-white w-2/3 h-12 rounded-3xl
            flex justify-between items-center px-5 gap-5
            cursor-pointer shadow-sm ease-in-out duration-150
            hover:shadow-2xl hover:-translate-y-2 hover:translate-x-2
            hover:bg-slate-100"
            onClick={() => push(`/exam-hall/${paper.collectionId}`)}
          >
            <h1 className="text-lg font-medium">
              {i + 1}. {paper.examName}
            </h1>
            <Image src={RightIcon} width={18} height={10} alt="visit" />
          </div>
        ))}
      </div>
    </>
  );
}
