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
  selectedExaminationPaper: string;
  loading: boolean;
  error: string | null;
}

const defaultState: IExaminationState = {
  examinationPapers: null,
  selectedExaminationPaper: "",
  loading: false,
  error: null,
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
  const [selectedExaminationPaper, setSelectedExaminationPaper] =
    useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  const loadExaminationPapers = async () => {
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
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  console.log("YEE examinationPapers", examinationPapers);

  useEffect(() => {
    loadExaminationPapers();
  }, []);

  useEffect(() => {
    if (!!query.slug) {
      setSelectedExaminationPaper(query.slug as string);
    }
  }, [query.slug]);

  return (
    <PaperContext.Provider
      value={{ examinationPapers, selectedExaminationPaper, loading, error }}
    >
      {children}
    </PaperContext.Provider>
  );
};

export const UsePaper = () => {
  const context = useContext<IExaminationState>(PaperContext);
  return context;
};
