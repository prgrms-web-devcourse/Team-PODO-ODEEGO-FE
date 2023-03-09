import { COLORS } from "@/constants";
import { SHADOWS } from "@/constants/css";
import { useModal } from "@/hooks";
import { MidPointState } from "@/recoil";
import { DefaultMidpointValue } from "@/recoil/midpoint-state";
import styled from "@emotion/styled";
import { ArrowBack, Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

const MapHeader = () => {
  const router = useRouter();
  const setMidPointState = useSetRecoilState(MidPointState);
  const { openModal } = useModal();

  const handleGoBack = () => {
    router.push("/");
  };

  const handleCancel = () => {
    openModal({
      children: <p>정말로 삭제 하시겠습니까?</p>,
      btnText: {
        confirm: "확인",
        close: "취소",
      },
      handleConfirm: () => {
        setMidPointState(DefaultMidpointValue);
        router.push("/");
      },
    });
  };
  return (
    <Header>
      <CustomIconButton onClick={handleGoBack}>
        <ArrowBack htmlColor={COLORS.altGreen} fontSize='inherit' />
      </CustomIconButton>
      <CustomIconButton onClick={handleCancel}>
        <Close htmlColor={COLORS.altGreen} fontSize='inherit' />
      </CustomIconButton>
    </Header>
  );
};

export default MapHeader;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4.5rem;
  background-color: ${COLORS.backgroundSecondary};
  box-shadow: ${SHADOWS.backdropNeutral};
  margin-bottom: 2rem;
  padding: 1rem;
  box-sizing: border-box;
  font-size: 2.4rem;
`;

const CustomIconButton = styled(IconButton)`
  color: ${COLORS.altGreen};
  > svg {
    font-size: 2rem;
  }
`;
