import { useRouter } from "next/router";
import Image from "next/image";
import CircularPercentageWheel from "@/components/Misc/percentage-wheel";
import Navbar from "@/components/Navbar/navbar";
import RightIcon from "@/assets/icons/right-arrow.svg";
import { databases } from "@/appwrite/appwriteConfig";
import { useEffect, useState } from "react";
import { Query } from "appwrite";
import config from "@/config";

const Result = () => {
  const { query, push } = useRouter();

  const [result, setResult] = useState<any>();

  const loadResult = async () => {
    let promise = databases.listDocuments(
      config.appwrite.PROJECT_ID,
      config.appwrite.USER_EXAM_HISTORY,
      [Query.equal("$id", query.resultId as string)]
    );

    promise.then(
      function (response) {
        setResult(response.documents[0]);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    loadResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-10 mt-10 w-full justify-center items-center">
        <div className="w-full flex flex-col sm:flex-row justify-between gap-8">
          <div
            className="flex flex-row gap-2 h-min font-semibold items-center
            text-white cursor-pointer"
            onClick={() => push("/home")}
          >
            <Image
              src={RightIcon}
              className="transform rotate-180 z-10"
              width={14}
              height={10}
              alt="visit"
            />
            Go Home
          </div>
          <div className="text-5xl font-bold text-center text-[#FFFAF0]">
            Result
          </div>
          <div className="text-left font-semibold text-[#FFFAF0]">
            Submitted at :
            <div>
              {new Date(result?.$createdAt).toLocaleDateString("en-us", {
                hour: "2-digit",
                minute: "2-digit",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-16 items-center justify-center">
          <div
            className="h-60 w-60 shadow-xl hover:shadow2xl rounded-lg
            hover:-translate-y-2 duration-100 bg-slate-50 hover:bg-white
            text-left flex items-center p-6"
          >
            <div className="text-3xl font-semibold">
              Total Questions:{" "}
              <div className="text-4xl text-green-500">
                {result?.attempted + result?.unattempted}
              </div>
            </div>
          </div>
          <div
            className="h-60 w-60 shadow-xl hover:shadow2xl rounded-lg
            hover:-translate-y-2 duration-100 bg-slate-50 hover:bg-white
            text-left flex flex-col gap-4 p-6"
          >
            <div className="text-3xl font-semibold">
              Attempted:{" "}
              <div className="text-4xl text-green-500">{result?.attempted}</div>
            </div>
            <div className="text-3xl font-semibold">
              Unattempted:{" "}
              <div className="text-4xl text-red-500">{result?.unattempted}</div>
            </div>
          </div>
          <div
            className="h-60 w-60 shadow-xl hover:shadow2xl rounded-lg
            hover:-translate-y-2 duration-100 bg-slate-50 hover:bg-white
            text-left flex flex-col gap-4 p-6"
          >
            <div className="text-3xl font-semibold">
              Marks Obtained:{" "}
              <div className="text-4xl text-green-500">
                {result?.marksObtained}
              </div>
            </div>
            <div className="text-3xl font-semibold">
              Total Marks: <div className="text-4xl">{result?.totalMarks}</div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-16 items-center justify-center">
          <div
            className="h-52 w-52 shadow-xl hover:shadow2xl rounded-lg
            hover:-translate-y-2 duration-100 bg-slate-50 hover:bg-white
            flex flex-col gap-2 justify-center items-center"
          >
            <div className="text-2xl font-semibold">Percentage:</div>
            <CircularPercentageWheel
              totalMarks={result?.totalMarks}
              correctMarks={result?.marksObtained}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
