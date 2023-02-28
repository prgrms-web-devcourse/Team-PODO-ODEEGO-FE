import styled from "@emotion/styled";
import useModal from "@/hooks/use-modal";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SearchConfirm = () => {
  const { openModal } = useModal();
  const router = useRouter();

  const modalContent = () => {
    return (
      <>
        <Container>
          {/* 닉네임을 받아올 수 있는가? */}
          <H1>000님이 주소를 요청했습니다.</H1>
          <P>약속 장소를 찾기 위해 주소가 필요합니다.</P>
          <P>계속 하시겠습니까?</P>
        </Container>
      </>
    );
  };

  // 여기서 id 값을 알 필요가 있을까?
  const handleOpenModal = () => {
    openModal({
      children: modalContent(),
      btnText: {
        confirm: "예",
        close: "아니요",
      },
      handleClose: () => {
        router.push("/");
      },
      handleConfirm: async () => {
        // router.push(`/search?id=${id}`);
      },
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id"); // 방 ID
    if (id !== null) handleOpenModal();
  }, []);

  // return <></>;
};

export default SearchConfirm;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

const H1 = styled.h1`
  font-size: 100%;
`;

const P = styled.p``;
