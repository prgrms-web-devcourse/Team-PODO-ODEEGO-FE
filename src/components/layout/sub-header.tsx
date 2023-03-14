import { COLORS } from "@/constants";
import { SHADOWS } from "@/constants/css";
import { useModal } from "@/hooks";
import { MidPointState, searchState } from "@/recoil";
import { DefaultMidpointValue } from "@/recoil/midpoint-state";
import { defaultSearchState } from "@/recoil/search-state";
import styled from "@emotion/styled";
import { ArrowBack, Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

const SubHeader = (props: { isMap?: boolean }) => {
  const router = useRouter();
  const setMidPointState = useSetRecoilState(MidPointState);
  const setSearchState = useSetRecoilState(searchState);
  const { openModal } = useModal();
  const { isMap } = props;

  const modalContent = () => {
    return (
      <Content>
        <p>검색 결과가 초기화됩니다.</p>
        <p>다시 돌아가시겠습니까</p>
      </Content>
    );
  };

  const handleGoBack = () => {
    router.push("/");
  };

  const handleCancel = () => {
    openModal({
      children: modalContent(),
      btnText: {
        confirm: "확인",
        close: "취소",
      },
      handleConfirm: () => {
        setMidPointState(DefaultMidpointValue);
        setSearchState(defaultSearchState);
        router.push("/");
      },
    });
  };
  return (
    <Header>
      <CustomIconButton onClick={handleGoBack}>
        <ArrowBack htmlColor={COLORS.altGreen} fontSize='inherit' />
      </CustomIconButton>
      {isMap && (
        <CustomIconButton onClick={handleCancel}>
          <Close htmlColor={COLORS.altGreen} fontSize='inherit' />
        </CustomIconButton>
      )}
    </Header>
  );
};

export default SubHeader;

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

const Content = styled.div`
  text-align: center;
  margin: 1rem 0;

  > p {
    margin: 0;
  }
`;
