import Navbar from "@/components/navbars/navbar";
import { useRouter } from "next/router";
import RightIcon from "@/assets/icons/right-arrow.svg";
import Image from "next/image";
import { UsePaper } from "@/hooks/PaperContext";

interface IQuestionPaper {
  examName: string;
  collectionId: string;
}

export default function Home() {
  const { push } = useRouter();
  const { examinationPapers } = UsePaper();

  return (
    <>
      <Navbar />
      <div className="flex flex-col text-left w-full h-full gap-12 mt-10">
        <h1 className="font-bold text-xl mb-2">Global Tests</h1>
        {examinationPapers?.map((paper, i) => (
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
              {i + 1}. {paper.name}
            </h1>
            <Image src={RightIcon} width={18} height={10} alt="visit" />
          </div>
        ))}
      </div>
    </>
  );
}
