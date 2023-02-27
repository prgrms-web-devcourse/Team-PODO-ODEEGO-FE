import FormInput from "@/components/group/form-input";
import { GroupDetailResponse } from "@/types/api/group";
import styled from "@emotion/styled";
import { Button, Container, Stack } from "@mui/material";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

interface InputState {
  username: string;
  value: string;
  lat: number;
  lng: number;
}

const GroupPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [inputs, setInputs] = useState<InputState[]>();
  const { capacity, remainingTime, participants, owner } = data;
  console.log(capacity, remainingTime, participants, owner);

  const getInputsByParticipant = useCallback(() => {
    let inputsByParticipants: InputState[];
    if (participants && participants.length > 0) {
      inputsByParticipants = participants.map(({ username, start }) => {
        const { stationName, lat, lng } = start;
        return { username, value: stationName, lat, lng };
      });
    } else {
      inputsByParticipants = Array.from(Array(capacity)).fill({
        username: "",
        value: "",
      });
    }

    return inputsByParticipants;
  }, [capacity, participants]);

  useEffect(() => {
    const initialInputs = getInputsByParticipant();
    setInputs(initialInputs);
  }, [getInputsByParticipant]);

  const handleInputClick = (username: string) => {
    router.push({
      pathname: "/search",
      query: {
        id: router.query.groupId,
        owner: username === owner,
      },
    });
  };

  return (
    <Container>
      <form>
        <Stack spacing={1.5}>
          {inputs &&
            inputs.map(({ username, value }, index) => (
              <div key={index}>
                {/* TODO: 이슈 #20 머지되면 /components/home/form-input 교체 */}
                <FormInput
                  index={index}
                  address={value}
                  placeholder='주소가 아직 없어요...'
                  onClick={() => handleInputClick(username)}
                />
                <InputLabel>
                  {value ? `${username}이 입력했습니다` : ""}
                </InputLabel>
              </div>
            ))}
        </Stack>
        <Stack spacing={1.5}>
          <CustomButton variant='contained' color='primary' size='large'>
            모임 취소하기
          </CustomButton>
          <CustomButton variant='contained' color='secondary' size='large'>
            중간지점 찾기
          </CustomButton>
        </Stack>
      </form>
    </Container>
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
