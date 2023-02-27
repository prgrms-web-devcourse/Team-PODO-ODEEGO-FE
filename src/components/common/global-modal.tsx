import { COLORS } from "@/constants/css";
import useModal from "@/hooks/use-modal";
import { ModalProps, modalState } from "@/recoil/modal-state";
import styled from "@emotion/styled";
import { Modal, Backdrop, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const GlobalModal = () => {
  const modalProps = useRecoilValue<ModalProps | null>(modalState);

  return <>{modalProps ? <_Modal {...modalProps} /> : null}</>;
};

const _Modal = ({
  handleConfirm,
  handleClose,
  children,
  btnText,
}: ModalProps) => {
  const { closeModal } = useModal();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const close = () => {
    setShow(false);
    setTimeout(() => {
      closeModal();
    }, 500);
  };

  const onConfirm = async () => {
    if (handleConfirm) await handleConfirm();
    close();
  };

  const onCancel = () => {
    if (handleClose) handleClose();
    close();
  };

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={show}
      onClose={close}
      slots={{ backdrop: Backdrop }}
      closeAfterTransition
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}>
      <Box>
        <FlexContainer>
          {children}
          {btnText ? (
            <FlexContainer direction='row'>
              {btnText.confirm && (
                <Button variant='contained' color='primary' onClick={onConfirm}>
                  {btnText.confirm}
                </Button>
              )}
              {btnText.close && (
                <Button variant='contained' color='neutral' onClick={onCancel}>
                  {btnText.close}
                </Button>
              )}
            </FlexContainer>
          ) : null}
        </FlexContainer>
      </Box>
    </Modal>
  );
};

export default GlobalModal;

const FlexContainer = styled.div<{ direction?: "column" | "row" }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ direction }) => direction || "column"};
  gap: 1rem;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 30rem;
  min-height: 10rem;
  padding: 1.5rem;
  box-sizing: border-box;
  background-color: ${COLORS.backgroundPrimary};
  border-radius: 0.8rem;
`;
