import { databases } from "@/appwrite/appwriteConfig";
import { useRouter } from "next/router";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface IExaminationState {
  examinationPapers: { name: string; collectionId: string }[] | null;
  selectedExam: any;
  loading: boolean;
  error: string | null;
  setSelectedExam: (exam: any) => void;
}

const defaultState: IExaminationState = {
  examinationPapers: null,
  selectedExam: null,
  loading: false,
  error: null,

  setSelectedExam: () => {},
};

const PaperContext = createContext<IExaminationState>(defaultState);

export const PaperProvider = ({ children }: { children: ReactNode }) => {
  const { query } = useRouter();

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
              collectionId: document.collectionId,
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

  useEffect(() => {
    loadExaminationPapers();
  }, []);

  return (
    <PaperContext.Provider
      value={{
        examinationPapers,
        selectedExam,
        setSelectedExam,
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
