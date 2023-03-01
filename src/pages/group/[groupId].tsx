import FormInput from "@/components/common/form-input";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";
import { tokenRecoilState } from "@/recoil/token-recoil";
import styled from "@emotion/styled";
import { Box, Button, CircularProgress, Container, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { useGroup } from "../api/group";

interface InputState {
  memberId: string;
  nickname: string;
  stationName: string;
  lat: number;
  lng: number;
}

const GroupPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputs, setInputs] = useState<InputState[]>();
  const token = useRecoilValue(tokenRecoilState);
  const { groupId } = router.query;
  const { data, isLoading, isError } = useGroup(
    groupId as string,
    token as string
  );

  const getInputsByParticipant = useCallback(() => {
    if (!data) return;
    const { participants, capacity } = data;
    if (participants && participants.length > 0) {
      const inputsByParticipants = participants.map(
        ({ memberId, nickname, start }) => {
          const { stationName, lat, lng } = start;
          return { memberId, nickname, stationName, lat, lng };
        }
      );
      return Array.from(
        { length: capacity },
        (_, i) =>
          inputsByParticipants[i] ?? {
            memberId: "",
            nickname: "",
            stationName: "",
          }
      );
    }

    return Array.from(Array(capacity)).fill({
      username: "",
      stationName: "",
    });
  }, [data]);

  useEffect(() => {
    const initialInputs = getInputsByParticipant();
    setInputs(initialInputs);
  }, [getInputsByParticipant]);

  const handleInputClick = (memberId: string) => {
    if (!data) return;

    const { hostId } = data;
    router.push({
      pathname: "/search",
      query: {
        groupId: router.query.groupId,
        host: memberId === hostId,
      },
    });
  };

  const handleCancel = () => {
    // **TODO: 모임 삭제 api 호출
    router.push("/");
  };

  const handleSearch = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!data) return;
    const { participants, capacity } = data;

    if (participants.length !== capacity) {
      toast.error("아직 주소를 다 못 받았어요..");
      return;
    }

    setIsSubmitting(true);
    // **TODO: 중간지점 찾기 api 호출
    // **TODO: 모임 삭제 api 호출
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(1000);
    setIsSubmitting(false);
  };

  if (isError) {
    return <p>There was an Error</p>;
  }

  return (
    <>
      <Header />
      <Main text='내 모임의 주소 제출 현황'>
        <Container
          sx={{
            maxHeight: "915px",
            overflow: "auto",
            paddingBottom: "2rem",
          }}>
          {isLoading && (
            <Box
              sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}
          <form>
            <Stack spacing={1.5}>
              {inputs &&
                inputs.map(({ nickname, stationName, memberId }, index) => (
                  <div key={index}>
                    <FormInput
                      index={index}
                      address={stationName}
                      placeholder='주소가 아직 없어요...'
                      onClick={() => handleInputClick(memberId)}
                    />
                    <InputLabel>
                      {stationName ? `${nickname}이 입력했습니다` : ""}
                    </InputLabel>
                  </div>
                ))}
            </Stack>
            <Stack spacing={1.5} sx={{ marginTop: "2rem" }}>
              <CustomButton
                variant='contained'
                color='primary'
                size='large'
                onClick={handleCancel}>
                모임 취소하기
              </CustomButton>
              <CustomButton
                variant='contained'
                color='secondary'
                size='large'
                type='submit'
                onClick={handleSearch}>
                {isSubmitting ? (
                  <CircularProgress size='2rem' />
                ) : (
                  "중간지점 찾기"
                )}
              </CustomButton>
            </Stack>
          </form>
        </Container>
        <Toaster />
      </Main>
    </>
  );
};

export default GroupPage;

const InputLabel = styled.span`
  display: inline-block;
  width: 100%;
  font-size: 1rem;
  text-align: right;
`;

const CustomButton = styled(Button)`
  font-size: 1.3rem;
`;
