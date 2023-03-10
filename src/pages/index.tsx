import styled from "@emotion/styled";
import { Box, CircularProgress, IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState, useSetRecoilState } from "recoil";
import { MidPointApi } from "@/axios/mid-point";
import { GroupsApi } from "@/axios/groups";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";
import { validateAddressListUnderTwoLength } from "@/utils/error";
import Header from "@/components/layout/header";
import {
  FormInput,
  HomeButton,
  LoginConfirmModal,
  SelectModal,
  ValidGroupModal,
} from "@/components/home";
import { useModal, useMultipleInputs, useTimeoutFn } from "@/hooks";
import { isFirstVisitState, MidPointState, searchState } from "@/recoil";
import { BUTTON_TEXT, MAIN_TEXT, MODAL_TEXT } from "@/constants/component-text";
import { COLORS, COUNT, ERROR_TEXT, ROUTES } from "@/constants";
import { AllGroupsResponse } from "@/types/api/group";

const { MAIN } = MAIN_TEXT;

const {
  BUTTON_MID_POINT_TEXT,
  BUTTON_GROUPS_ALT_TEXT,
  BUTTON_GROUPS_DEFAULT_TEXT,
} = BUTTON_TEXT;

const { LOGIN_TEXT, CLOSE_TEXT, MAKE_A_GROUP_TEXT } = MODAL_TEXT;

const { ERROR_UNSELECT_PEOPLE_COUNT } = ERROR_TEXT;

const { SEARCH, LOGIN, MAP, GROUP, HOME } = ROUTES;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [groupId, setGroupId] = useState("");
  const setMidPointResponse = useSetRecoilState(MidPointState);
  const token = getLocalStorage("token");
  const hasAccessToken = token ? true : false;
  const [addressList, setAddressList] = useRecoilState(searchState);
  const { inputs, addInput, removeInput } = useMultipleInputs();
  const router = useRouter();
  const { openModal } = useModal();
  const setIsFirstVisit = useSetRecoilState(isFirstVisitState);

  //methods & modal config
  const loginModalConfig = {
    children: <LoginConfirmModal />,
    btnText: {
      confirm: LOGIN_TEXT,
      close: CLOSE_TEXT,
    },
    handleConfirm: async () => {
      router.push(`${LOGIN}`);
    },
  };

  const getSelectModalConfig = (isValid: boolean, groupId = "") => ({
    children: <SelectModal isValid={isValid} />,
    btnText: {
      confirm: MAKE_A_GROUP_TEXT,
      close: CLOSE_TEXT,
    },
    handleConfirm: async () => {
      //모임 생성 Test API
      // - 현재 약속방을 삭제하는 기능이 없음
      // - memberId가 계속 바뀌어야 합니다. 동일한 memberId로 계속 만드는 경우, 이미 존재한다는 에러 발생
      const gId = groupId;
      try {
        const count = getLocalStorage(COUNT);
        if (count === "") throw new Error(ERROR_UNSELECT_PEOPLE_COUNT);

        //만료된 방이 있다면, 방 삭제 후, 방 만들기
        if (!isValid && gId) {
          await GroupsApi.deleteGroup(gId, token);
        }

        const data = await GroupsApi.postCreateGroup(token, count);
        setLocalStorage(COUNT, "");

        const { groupId } = data;
        setIsFirstVisit(true);
        router.push(`${GROUP}/${groupId}`);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        toast.error(errorMessage);
      }
    },
  });

  const getValidGroupModalConfig = (minutes: number, seconds: number) => ({
    children: <ValidGroupModal minutes={minutes} seconds={seconds} />,
    btnText: {
      confirm: "모임방 가기",
    },
    handleConfirm: async () => {
      try {
        const { groupId, minutes, seconds } =
          await getMinutesSecondsAndGroupIdFromGroupAPI(token);

        minutes === 0 && seconds === 0
          ? router.push(`${HOME}`)
          : router.push(`${GROUP}/${groupId}`);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        toast.error(errorMessage);
      }
    },
  });

  const getMinutesSecondsAndGroupIdFromGroupAPI = async (token: string) => {
    const { groups }: AllGroupsResponse = await GroupsApi.getAll(token);
    const { groupId, remainingTime } = groups[0];

    const times = remainingTime.split(":");
    const minutes = Number(times[1]);
    const seconds = Math.floor(Number(times[2]));

    return {
      groupId,
      minutes,
      seconds,
    };
  };

  useEffect(() => {
    const initGroupId = async () => {
      if (!hasAccessToken) return;

      //TODO 실제 모임조회 api로 바꾸기
      try {
        const data = await GroupsApi.getAll(token);
        const groupId = data?.groups?.[0]?.groupId || "";

        setGroupId(groupId);
        setLocalStorage(COUNT, "");
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        toast.error(errorMessage);
        setLocalStorage(COUNT, "");
      }
    };

    initGroupId();
  }, [hasAccessToken, setGroupId, token]);

  //event handler
  const handleInputClickRoute = (index: number) => {
    router.push(`${SEARCH}?id=${index}`);
  };

  const handleButtonClickGroups = async () => {
    // * 유효시간 모달 체크 코드
    // openModal(getValidGroupModalConfig(1, 0));
    if (isLoading) return;
    if (!hasAccessToken) {
      openModal(loginModalConfig);

      return;
    }
    if (!groupId) {
      openModal(getSelectModalConfig(true));
      return;
    }

    try {
      const { minutes, seconds } =
        await getMinutesSecondsAndGroupIdFromGroupAPI(token);

      if (minutes === 0 || seconds === 0) {
        openModal(getSelectModalConfig(false, groupId));
      } else {
        openModal(getValidGroupModalConfig(minutes, seconds));
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      toast.error(errorMessage);
    }
  };

  const handleButtonClickMiddlePointSubmit = async () => {
    if (isLoading) return;

    const notEmptyAddressList = addressList.filter((a) => a.stationName !== "");

    setIsLoading(true);
    try {
      const errorMessage =
        validateAddressListUnderTwoLength(notEmptyAddressList);
      if (errorMessage) throw new Error(errorMessage);

      const data = await MidPointApi.postMidPoint(notEmptyAddressList);

      setAddressList(notEmptyAddressList);
      setMidPointResponse(data);
      router.push(`${MAP}`);
    } catch (e) {
      setIsLoading(false);

      const errorMessage = e instanceof Error ? e.message : String(e);
      toast.error(errorMessage);
    }
  };

  const { run: debounceMidPoint } = useTimeoutFn({
    fn: async () => {
      handleButtonClickMiddlePointSubmit();
    },
    ms: 500,
  });

  return (
    <>
      <Header />
      <MainContainer>
        <BorderContainer />
        <TextP>{MAIN}</TextP>
        <Form>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            {inputs.map((input, index) => (
              <FormInput
                key={index}
                index={index}
                stationName={input.stationName}
                onClick={() => !isLoading && handleInputClickRoute(index)}
                onRemove={(e) => !isLoading && removeInput(e, index)}
              />
            ))}
            {inputs.length < 4 && (
              <IconButton
                aria-label='add'
                sx={{ color: "#b4c9bc" }}
                onClick={(e) => !isLoading && addInput(e)}>
                <AddIcon />
              </IconButton>
            )}
          </Box>
          <LoadingContainer>
            {isLoading && (
              <CircularProgress
                size='4rem'
                sx={{
                  color: "#DBE4D7",
                }}
              />
            )}
          </LoadingContainer>
          <Stack
            spacing={1.5}
            sx={{
              width: "80%",
              textAlign: "center",
              "& span": {
                fontSize: "1.5rem",
              },
            }}>
            <HomeButton
              onClick={debounceMidPoint}
              defaultText={BUTTON_MID_POINT_TEXT}
              color='secondary'
            />
            <span>OR</span>
            <HomeButton
              onClick={handleButtonClickGroups}
              hasCondition={!!groupId}
              defaultText={BUTTON_GROUPS_DEFAULT_TEXT}
              altText={BUTTON_GROUPS_ALT_TEXT}
            />
          </Stack>
          <Toaster />
        </Form>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.main`
  width: 100%;
  max-height: 625px;
  min-height: 509px;
  height: 80vh;
  background-color: ${COLORS.backgroundPrimary};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: -2px 0 4px -5px #333, 2px 0 4px -5px #333;
  user-select: none;
`;

const TextP = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin: 4rem 0 3.3rem 0;
  opacity: 0.7;
  color: ${COLORS.semiBlack};
`;

const BorderContainer = styled.div`
  height: 3rem;
  width: 100%;
  background-color: ${COLORS.backgroundPrimary};
  margin-top: -15px;
  border-radius: 20px 20px 0 0;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const LoadingContainer = styled.div`
  height: 5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
`;
