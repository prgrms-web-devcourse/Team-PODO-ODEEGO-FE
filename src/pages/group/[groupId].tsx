import { GroupsApi } from "@/axios/groups";
import { MidPointApi } from "@/axios/mid-point";
import FormInput from "@/components/common/form-input";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";
import { COLORS, COUNT, ERROR_TEXT } from "@/constants";
import { useModal } from "@/hooks";
import { isFirstVisitState, MidPointState } from "@/recoil";
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
import { toast } from "react-hot-toast";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useGroupDetail } from "@/axios/groups";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";
import { SelectModal, ValidGroupModal } from "@/components/home";
import formatTime from "@/utils/format-time";

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
  const token = getLocalStorage("token");
  const [groupId, setGroupId] = useState<string>("");
  const [remainingTime, setRemainingTime] = useState<{
    minutes: number;
    seconds: number;
  }>();
  const {
    data,
    isLoading,
    isError,
    isLoadingError,
    isFetching,
    isInitialLoading,
    refetch,
    error,
  } = useGroupDetail(groupId, token);

  useEffect(() => {
    if (router.isReady) {
      setGroupId(router.query.groupId as string);
    }
  }, [router, setGroupId]);

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
    const groupLink = `${process.env.NEXT_PUBLIC_DOMAIN}/search?groupId=${groupId}`;
    const handleCopy = async () => {
      await navigator.clipboard.writeText(groupLink);
    };

    return (
      <div>
        <p>????????? ???????????? ????????? ??????????????????</p>
        <FormInput index={0} address={groupLink} onClick={handleCopy} />
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
    await refetch();
    getInputsByParticipant();
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    openModal({
      children: <p>????????? ?????????????????????????</p>,
      btnText: {
        confirm: "??????",
        close: "??????",
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
      toast.error("?????? ????????? ??? ??? ????????????..");
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
    router.push("/map");
  };

  if ((isLoadingError || isError) && error instanceof Error) {
    toast.error(error.message);
    router.push("/");
  }

  useEffect(() => {
    if (!data) return;

    const { minutes, seconds } = formatTime(data.remainingTime);

    if (minutes === 0 && seconds === 0) {
      const gId = groupId;
      openModal({
        children: <SelectModal isValid={false} />,
        btnText: {
          confirm: "?????? ?????????",
          close: "????????? ??????",
        },
        handleConfirm: async () => {
          try {
            const count = getLocalStorage(COUNT);
            if (count === "")
              throw new Error(ERROR_TEXT.ERROR_UNSELECT_PEOPLE_COUNT);

            //????????? ?????? ?????????, ??? ?????? ???, ??? ?????????
            await GroupsApi.deleteGroup(gId, token);

            const data = await GroupsApi.postCreateGroup(token, count);
            setLocalStorage(COUNT, "");

            const { groupId } = data;
            setIsFirstVisit(true);
            router.replace(`/group/${groupId}`);
          } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            toast.error(errorMessage);
          }
        },
        handleClose: async () => {
          try {
            await GroupsApi.deleteGroup(gId, token);
            router.replace("/");
          } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            toast.error(errorMessage);
          }
        },
      });
    }

    if (minutes <= 5) {
      setRemainingTime({ minutes, seconds });
    }
  }, [data, groupId, openModal, router, setIsFirstVisit, token]);

  return (
    <>
      <Header />
      <Main text='??? ????????? ?????? ?????? ??????'>
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
              alignItems: "center",
              marginBottom: "1rem",
            }}>
            <CustomIconButton onClick={handleLink}>
              <InsertLink />
            </CustomIconButton>
            {remainingTime && (
              <ValidGroupModal
                minutes={remainingTime.minutes}
                seconds={remainingTime.seconds}
                style={{ fontSize: "1.2rem", textAlign: "center", margin: "0" }}
              />
            )}
            <CustomIconButton onClick={handleRefresh}>
              <Refresh />
            </CustomIconButton>
          </Box>
          <form>
            <InputsContainer>
              {(isSubmitting || isLoading || isInitialLoading) && (
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
              <Stack spacing={1.5}>
                {inputs &&
                  inputs.map(({ nickname, stationName, memberId }, index) => (
                    <>
                      <FormInput
                        index={index}
                        address={stationName}
                        placeholder='????????? ?????? ?????????...'
                        onClick={() => handleInputClick(memberId)}
                      />
                      <InputLabel>
                        {stationName ? `${nickname}??? ??????????????????` : ""}
                      </InputLabel>
                    </>
                  ))}
              </Stack>
            </InputsContainer>
            <Stack spacing={1.5} sx={{ marginTop: "2rem" }}>
              <CustomButton
                variant='contained'
                color='primary'
                size='large'
                onClick={handleCancel}>
                ?????? ????????????
              </CustomButton>
              <CustomButton
                variant='contained'
                color='secondary'
                size='large'
                type='submit'
                onClick={handleSearch}>
                ???????????? ??????
              </CustomButton>
            </Stack>
          </form>
        </Container>
      </Main>
    </>
  );
};

export default GroupPage;

const InputsContainer = styled.div`
  position: relative;
  min-height: 10rem;
`;

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
