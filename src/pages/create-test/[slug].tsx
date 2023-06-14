import { useRouter } from "next/router";
import Navbar from "@/components/Navbar/navbar";
import { databases } from "@/appwrite/appwriteConfig";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import InputText from "@/components/InputField/input-text";
import MandatoryStar from "@/components/Misc/mandatory-star";
import config from "@/config";

const Result = () => {
  const { query } = useRouter();

  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>([""]);
  const [correctMarks, setCorrectMarks] = useState<string>("");
  const [incorrectMarks, setIncorrectMarks] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const fillOption = (value: string, id: number) => {
    setOptions(options.map((option, i) => (i === id ? value : option)));
  };

  const submitQuestion = async () => {
    const payload = {
      ques: question,
      options: options,
      answer: [answer],
      mark: Number(correctMarks),
      negativeMark: Number(incorrectMarks),
      isMultiChoice: false,
      examID: query.slug,
    };
    const promise = databases.createDocument(
      config.appwrite.PROJECT_ID,
      config.appwrite.QUESTION_BANK_ID,
      uuidv4(),
      payload
    );

    promise.then(
      function (response) {
        console.log(response);
        setQuestion("");
        setOptions([""]);
        setCorrectMarks("");
        setIncorrectMarks("");
        setAnswer("");
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const handleAddQuesDisable = () => {
    return (
      !question ||
      !correctMarks ||
      !incorrectMarks ||
      options.some((option) => option === "")
    );
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-10 mt-10 w-full">
        <div className="sm:w-1/2 flex flex-col gap-4">
          <div className="text-xl font-medium">
            Question Text
            <MandatoryStar />
          </div>
          <InputText
            classname="bg-white h-12 rounded-2xl w-full text-black font-medium"
            text={question}
            setText={setQuestion}
            placeholder="Question text"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {options.map((option: string, i: number) => (
              <div key={i}>
                <div className="text-lg font-medium mb-2">
                  Option {i + 1}
                  <MandatoryStar />
                </div>
                <InputText
                  key={i}
                  classname="bg-white h-12 rounded-2xl text-black font-medium"
                  text={option}
                  setText={(e) => fillOption(e, i)}
                  placeholder={`Option ${i + 1}`}
                />
              </div>
            ))}
          </div>
          <button
            className="px-10 bg-[#0D99FF] rounded-3xl shadow-sm
            text-white font-medium hover:opacity-90 ease-in-out
            h-10 w-max"
            onClick={() => setOptions((prevOptions) => [...prevOptions, ""])}
          >
            Add option
          </button>
          <div className="text-xl font-medium">
            Marks
            <MandatoryStar />
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <InputText
              classname="bg-white h-12 rounded-2xl w-full text-black font-medium"
              text={correctMarks}
              setText={setCorrectMarks}
              placeholder="Correct Marks(+)"
            />
            <InputText
              classname="bg-white h-12 rounded-2xl w-full text-black font-medium"
              text={incorrectMarks}
              setText={setIncorrectMarks}
              placeholder="Incorrect Marks(-)"
            />
          </div>
          <div className="text-xl font-medium">
            Answer
            <MandatoryStar />
          </div>
          <InputText
            classname="bg-white h-12 rounded-2xl w-full text-black font-medium"
            text={answer}
            setText={setAnswer}
            placeholder="Answer"
          />
        </div>
        <button
          className="px-10 bg-[#0D99FF] rounded-3xl shadow-sm
            text-white font-medium hover:opacity-90 ease-in-out
            cursor-pointer
            h-10 w-max disabled:opacity-90 disabled:cursor-not-allowed"
          disabled={handleAddQuesDisable()}
          onClick={() => submitQuestion()}
        >
          Submit question
        </button>
      </div>
    </>
  );
};

export default Result;
