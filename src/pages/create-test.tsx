import { useRouter } from "next/router";
import Image from "next/image";
import CircularPercentageWheel from "@/components/Misc/percentage-wheel";
import Navbar from "@/components/Navbar/navbar";
import RightIcon from "@/assets/icons/right-arrow.svg";
import { databases } from "@/appwrite/appwriteConfig";
import { useEffect, useState } from "react";
import { Query } from "appwrite";

const CreateTest = () => {
  const { query, push } = useRouter();
  console.log("YEE QUERY --", query, query.resultId as string);

  const [result, setResult] = useState<any>();
  console.log("YEE RESULT --", result);

  const loadResult = async () => {
    let promise = databases.listDocuments(
      "647cccd637b162c557f3",
      "6480edbcf330b7e4ad83",
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
            className="flex flex-row gap-2 h-min font-semibold items-center cursor-pointer"
            onClick={() => push("/home")}
          >
            <Image
              src={RightIcon}
              className="transform rotate-180 -z-10"
              width={14}
              height={10}
              alt="visit"
            />
            Go Home
          </div>
          <h1 className="text-5xl font-bold text-center">Result</h1>
          <div className="text-left font-semibold">
            Submitted at :
            <p>
              {new Date(result?.$createdAt).toLocaleDateString("en-us", {
                hour: "2-digit",
                minute: "2-digit",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-16 items-center justify-center">
          <div
            className="h-60 w-60 shadow-xl hover:shadow2xl rounded-lg
            hover:-translate-y-2 duration-100
            text-left flex items-center p-6"
          >
            <div className="text-3xl font-semibold">
              Total Questions:{" "}
              <h1 className="text-4xl text-green-500">
                {result?.attempted + result?.unattempted}
              </h1>
            </div>
          </div>
          <div
            className="h-60 w-60 shadow-xl hover:shadow2xl rounded-lg
            hover:-translate-y-2 duration-100
            text-left flex flex-col gap-4 p-6"
          >
            <h2 className="text-3xl font-semibold">
              Attempted:{" "}
              <h1 className="text-4xl text-green-500">{result?.attempted}</h1>
            </h2>
            <h2 className="text-3xl font-semibold">
              Unattempted:{" "}
              <h1 className="text-4xl text-red-500">{result?.unattempted}</h1>
            </h2>
          </div>
          <div
            className="h-60 w-60 shadow-xl hover:shadow2xl rounded-lg
            hover:-translate-y-2 duration-100
            text-left flex flex-col gap-4 p-6"
          >
            <h2 className="text-3xl font-semibold">
              Marks Obtained:{" "}
              <h1 className="text-4xl text-green-500">
                {result?.marksObtained}
              </h1>
            </h2>
            <h2 className="text-3xl font-semibold">
              Total Marks: <h1 className="text-4xl">{result?.totalMarks}</h1>
            </h2>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-16 items-center justify-center">
          <div
            className="h-52 w-52 shadow-xl hover:shadow2xl rounded-lg
            hover:-translate-y-2 duration-100
            flex flex-col gap-2 justify-center items-center"
          >
            <h2 className="text-2xl font-semibold">Percentage:</h2>
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

export default CreateTest;
