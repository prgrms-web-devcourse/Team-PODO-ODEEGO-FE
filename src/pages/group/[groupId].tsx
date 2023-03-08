import { GroupsApi } from "@/axios/groups";
import { MidPointApi } from "@/axios/mid-point";
import FormInput from "@/components/common/form-input";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";
import { COLORS } from "@/constants";
import { useModal } from "@/hooks";
import { GroupState, isFirstVisitState, MidPointState } from "@/recoil";
import { tokenRecoilState } from "@/recoil/token-recoil";
import { searchProps } from "@/types/search-props";
import styled from "@emotion/styled";
import { InsertLink, Refresh } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useGroup } from "@/axios/groups";

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
  const [isFirstVisit, setIsFirstVisit] = useRecoilState(isFirstVisitState);
  const setMidpointResponse = useSetRecoilState(MidPointState);
  const { openModal } = useModal();
  const token = useRecoilValue(tokenRecoilState);
  const [groupId, setGroupId] = useRecoilState(GroupState);
  const { data, isLoading, isError, isFetching } = useGroup(groupId, token);

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
    if (isFetching || isSubmitting) return;
    if (!data) return;

    const { hostId } = data;
    router.push({
      pathname: "/search",
      query: {
        groupId: groupId,
        host: memberId === hostId,
      },
    });
  };

  const linkModalContent = useCallback(() => {
    const handleCopy = async () => {
      await navigator.clipboard.writeText(`/search?groupId=${groupId}`);
    };

    return (
      <div>
        <p>링크를 공유해서 주소를 입력받으세요</p>
        <FormInput
          index={0}
          address={`/search?groupId=${groupId}`}
          onClick={handleCopy}
        />
      </div>
    );
  }, [groupId]);

  const openLinkModal = useCallback(() => {
    openModal({
      children: linkModalContent(),
      handleClose: () => {
        setIsFirstVisit(false);
      },
    });
  }, [linkModalContent, openModal, setIsFirstVisit]);

  useEffect(() => {
    if (!isLoading && !isError && isFirstVisit) openLinkModal();
  }, [isFirstVisit, openLinkModal, isError, isLoading]);

  const handleLink = () => {
    openLinkModal();
  };

  const handleRefresh = async () => {
    setIsSubmitting(true);
    await GroupsApi.getGroup(groupId, token);
    getInputsByParticipant();
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    openModal({
      children: <p>정말로 삭제하시겠습니까?</p>,
      btnText: {
        confirm: "계속",
        close: "취소",
      },
      handleConfirm: async () => {
        await GroupsApi.deleteGroup(groupId, token);
        setIsFirstVisit(null);
        setGroupId("");
        router.push("/");
      },
    });
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
    if (!inputs) return;
    const filteredInputs: searchProps[] = inputs.map((input) => {
      return { stationName: input.stationName, lat: input.lat, lng: input.lng };
    });
    const midpoints = await MidPointApi.postMidPoint(filteredInputs);
    setMidpointResponse(midpoints);
    await GroupsApi.deleteGroup(groupId, token);
    setIsSubmitting(false);
  };

  if (isError) {
    toast.error("페이지 호출하는데 문제가 생겼어요...");
    router.push("/");
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}>
            <CustomIconButton onClick={handleLink}>
              <InsertLink />
            </CustomIconButton>
            <CustomIconButton onClick={handleRefresh}>
              <Refresh />
            </CustomIconButton>
          </Box>
          {(isSubmitting || isLoading) && (
            <Box
              sx={{
                display: "flex",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                justifyContent: "center",
                zIndex: "1000",
              }}>
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
                중간지점 찾기
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

const CustomIconButton = styled(IconButton)`
  color: ${COLORS.altGreen};
  > svg {
    font-size: 2rem;
  }
`;
