import FormInput from "@/components/common/form-input";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";
import { GroupDetailResponse } from "@/types/api/group";
import styled from "@emotion/styled";
import { Button, CircularProgress, Container, Stack } from "@mui/material";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

interface InputState {
  memberId: string;
  nickname: string;
  stationName: string;
  lat: number;
  lng: number;
}

const GroupPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState<InputState[]>();
  const { capacity, remainingTime, participants, hostId } = data;
  console.log(capacity, remainingTime, participants, hostId);

  const getInputsByParticipant = useCallback(() => {
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
  }, [capacity, participants]);

  useEffect(() => {
    const initialInputs = getInputsByParticipant();
    setInputs(initialInputs);
  }, [getInputsByParticipant]);

  const handleInputClick = (memberId: string) => {
    router.push({
      pathname: "/search",
      query: {
        id: router.query.groupId,
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

    if (participants.length !== capacity) {
      toast.error("아직 주소를 다 못 받았어요..");
      return;
    }

    setIsLoading(true);
    // **TODO: 중간지점 찾기 api 호출
    // **TODO: 모임 삭제 api 호출
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(1000);
    setIsLoading(false);
  };

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
                {isLoading ? <CircularProgress size='2rem' /> : "중간지점 찾기"}
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

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  // 404 Page if no params
  if (!params) {
    return {
      notFound: true,
    };
  }

  const groupId = params.groupId;
  // **TODO: 모임 정보 api 호출 endpoint로 교체
  const res = await fetch(
    `https://63fb17c14e024687bf71cf31.mockapi.io/group/${groupId}`
  );

  const data: GroupDetailResponse = await res.json();
  console.log(data);

  // Redirect home if no data
  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data,
    },
  };
};
