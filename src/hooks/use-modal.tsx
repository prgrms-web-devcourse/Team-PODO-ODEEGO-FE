import { ModalProps, modalState } from "@/recoil/modal-state";
import { useRecoilState } from "recoil";

const useModal = () => {
  const [modalProps, setModalProps] = useRecoilState(modalState);

  const showModal = (modalProps: ModalProps) => {
    setModalProps(modalProps);
  };

  const closeModal = () => {
    setModalProps(null);
  };

  return { modalProps, showModal, closeModal };
};

export default useModal;
