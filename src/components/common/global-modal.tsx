import { COLORS } from "@/constants/css";
import useModal from "@/hooks/use-modal";
import useTimeoutFn from "@/hooks/use-timeout-fn";
import { ModalProps, modalState } from "@/recoil/modal-state";
import styled from "@emotion/styled";
import Close from "@mui/icons-material/Close";
import {
  Modal,
  Backdrop,
  Button,
  IconButton,
  IconButtonProps,
} from "@mui/material";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const close = () => {
    if (isLoading) return;

    setShow(false);
    closeModal();
  };

  const onConfirm = async () => {
    setIsLoading(true);
    if (handleConfirm) await handleConfirm();
    setIsLoading(false);

    close();
  };

  const onCancel = () => {
    if (handleClose) handleClose();
    close();
  };

  const { run: onConfirmDebounce } = useTimeoutFn({
    fn: async () => {
      onConfirm();
    },
    ms: 500,
  });

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={show}
      onClose={onCancel}
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
                <CustomButton
                  variant='contained'
                  color='primary'
                  onClick={onConfirmDebounce}>
                  {btnText.confirm}
                </CustomButton>
              )}
              {btnText.close && (
                <CustomButton
                  variant='contained'
                  color='neutral'
                  onClick={onCancel}>
                  {btnText.close}
                </CustomButton>
              )}
            </FlexContainer>
          ) : null}
        </FlexContainer>
        {!btnText?.close && (
          <CloseButton aria-label='close' onClick={onCancel}>
            <Close />
          </CloseButton>
        )}
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

const CustomButton = styled(Button)`
  font-size: 1.1rem;
`;

const CloseButton = styled(IconButton)<IconButtonProps>`
  position: absolute;
  top: -2rem;
  right: 0;
  padding: 0;
  color: ${COLORS.backgroundSecondary};
`;
