import { ModalProps, modalState } from "@/recoil/modal-state";
import { useCallback } from "react";
import { useRecoilState } from "recoil";

const useModal = () => {
  const [modalProps, setModalProps] = useRecoilState(modalState);

  const openModal = useCallback(
    (modalProps: ModalProps) => {
      setModalProps(modalProps);
    },
    [setModalProps]
  );

  const closeModal = useCallback(() => {
    setModalProps(null);
  }, [setModalProps]);

  return { modalProps, openModal, closeModal };
};

export default useModal;
