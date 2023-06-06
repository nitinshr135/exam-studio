import React, { ReactNode, createContext, useContext, useState } from "react";

const ModalContext = createContext<any>({} as any);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalOpen, setModalOpen] = useState(true);
  const [modalType, setModalType] = useState("");
  const [modalOption, setModalOption] = useState<any>();

  return (
    <ModalContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        modalType,
        setModalType,
        modalOption,
        setModalOption,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const UseModal = () => {
  const context = useContext<any>(ModalContext);
  return context;
};
