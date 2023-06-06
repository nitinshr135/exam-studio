import { UseModal } from "@/hooks/modal-context";
import SubmitExamModal from "./submit-exam-modal";

const AllModals = () => {
  const { modalOpen, modalType, modalOption } = UseModal();

  if (modalType === "submitExam" && modalOpen) {
    return <SubmitExamModal />;
  }

  return <></>;
};

export default AllModals;
