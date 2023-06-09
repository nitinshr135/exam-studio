import { databases } from "@/appwrite/appwriteConfig";
import { useRouter } from "next/router";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UseUser } from "./user-context";
import { Query } from "appwrite";

export interface IExaminationState {
  examinationPapers: { name: string; collectionId: string }[] | null;
  selectedExam: any;
  loading: boolean;
  examHistory: any;
  selectedExamHistory: any;
  setSelectedExam: (exam: any) => void;
  error: string | null;
  setSelectedExamHistory: (exam: any) => void;
}

const defaultState: IExaminationState = {
  examinationPapers: null,
  selectedExam: null,
  examHistory: null,
  selectedExamHistory: null,
  loading: false,
  error: null,

  setSelectedExam: () => {},
  setSelectedExamHistory: () => {},
};

const PaperContext = createContext<IExaminationState>(defaultState);

export const PaperProvider = ({ children }: { children: ReactNode }) => {
  const { user } = UseUser();

  const [examinationPapers, setExaminationPapers] = useState<
    | {
        name: string;
        collectionId: string;
      }[]
    | null
  >(null);

  const [selectedExam, setSelectedExam] = useState<any>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const [examHistory, setExamHistory] = useState<any>();
  const [selectedExamHistory, setSelectedExamHistory] = useState<any>();

  const loadExaminationPapers = async () => {
    setLoading(true);
    let promise = databases.listDocuments(
      "647cccd637b162c557f3",
      "647cf4bf200f3913bdfc"
      // [Query.equal("title", "Avatar")]
    );

    promise.then(
      function (response) {
        if (!!response)
          setExaminationPapers(
            (response as any).documents.map((document: any) => ({
              name: document.examName,
              collectionId: document.$id,
            }))
          );

        setLoading(false);
        console.log(response);
      },
      function (error) {
        setLoading(false);
        console.log(error);
      }
    );
  };

  const userExamHistory = async () => {
    let promise = databases.listDocuments(
      "647cccd637b162c557f3",
      "6480edbcf330b7e4ad83",
      [Query.equal("userId", user?.$id)]
    );

    promise.then(
      function (response) {
        if (!!response) {
          setExamHistory(
            (response as any).documents.map((document: any) => ({
              resultId: document.$id,
              examId: document.examId,
              userId: document.userId,
              marksObtained: document.marksObtained,
              attempted: document.attempted,
              unattempted: document.unattempted,
              sumbittedAt: document.$createdAt,
              totalMarks: document.totalMarks,
            }))
          );
        }
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    loadExaminationPapers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!!user) userExamHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <PaperContext.Provider
      value={{
        examinationPapers,
        selectedExam,
        setSelectedExam,
        examHistory,
        selectedExamHistory,
        setSelectedExamHistory,
        loading,
        error,
      }}
    >
      {children}
    </PaperContext.Provider>
  );
};

export const UsePaper = () => {
  const context = useContext<IExaminationState>(PaperContext);
  return context;
};
