import Navbar from "@/components/Navbar/navbar";
import { useRouter } from "next/router";
import RightIcon from "@/assets/icons/right-arrow.svg";
import Image from "next/image";
import { UsePaper } from "@/hooks/paper-context";

export default function Home() {
  const { push } = useRouter();
  const { examinationPapers, setSelectedExam } = UsePaper();

  return (
    <>
      <Navbar />
      <div className="flex flex-col text-left w-full h-full gap-12 mt-10">
        <h1 className="font-bold text-2xl mb-2">Global Tests</h1>
        {examinationPapers?.map((paper, i) => (
          <div
            key={i}
            className="bg-white w-full sm:w-2/3 h-12 rounded-3xl
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
            <Image src={RightIcon} width={18} height={10} alt="visit" />
          </div>
        ))}
        <button
          className="px-8 bg-[#0D99FF] h-10 rounded-3xl shadow-sm text-white
          font-medium hover:opacity-90 ease-in-out w-max
          flex items-center justify-center gap-2"
          onClick={() => null}
        >
          <h1 className="text-2xl font-medium pb-1">+</h1>
          Create a Test
        </button>
      </div>
    </>
  );
}
