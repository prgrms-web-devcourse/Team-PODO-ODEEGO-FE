import styled from "@emotion/styled";
import {
  Button,
  CircularProgress,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useRecoilState, useSetRecoilState } from "recoil";
import { MidPointApi } from "@/axios/mid-point";
import { GroupsApi } from "@/axios/groups";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";
import { validateAddressListUnderTwoLength } from "@/utils/error";
import Header from "@/components/layout/header";
import {
  LoginConfirmModal,
  SelectModal,
  ValidGroupModal,
} from "@/components/home";
import { useModal, useMultipleInputs, useTimeoutFn } from "@/hooks";
import { isFirstVisitState, MidPointState, searchState } from "@/recoil";
import { BUTTON_TEXT, MAIN_TEXT, MODAL_TEXT } from "@/constants/component-text";
import { COUNT, ERROR_TEXT, ROUTES } from "@/constants";
import { AllGroupsResponse } from "@/types/api/group";
import { formatTime, inputsEqual } from "@/utils/helpers";
import Main from "@/components/layout/main";
import FormInput from "@/components/common/form-input";
import { CustomError } from "@/constants/custom-error";

const { MAIN } = MAIN_TEXT;

const {
  BUTTON_MID_POINT_TEXT,
  BUTTON_GROUPS_ALT_TEXT,
  BUTTON_GROUPS_DEFAULT_TEXT,
} = BUTTON_TEXT;

const { LOGIN_TEXT, CLOSE_TEXT, MAKE_A_GROUP_TEXT } = MODAL_TEXT;

const { ERROR_UNSELECT_PEOPLE_COUNT, ERROR_DUPLICATE_START_POINT } = ERROR_TEXT;

const { SEARCH, LOGIN, MAP, GROUP, HOME } = ROUTES;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [groupId, setGroupId] = useState("");
  const [midPointResponse, setMidPointResponse] = useRecoilState(MidPointState);
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
      const gId = groupId;
      try {
        const count = getLocalStorage(COUNT);
        if (count === "") throw new Error(ERROR_UNSELECT_PEOPLE_COUNT);

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
    const { minutes, seconds } = formatTime(remainingTime);

    return {
      groupId,
      minutes,
      seconds,
    };
  };

  useEffect(() => {
    const initGroupId = async () => {
      if (!hasAccessToken) return;

      try {
        const data = await GroupsApi.getAll(token);
        const groupId = data?.groups?.[0]?.groupId || "";

        await GroupsApi.getGroup(groupId, token);

        setGroupId(groupId);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);

        if (
          errorMessage !== CustomError["G007"].error &&
          errorMessage !== CustomError["M001"].error
        )
          toast.error(errorMessage);

        setGroupId("");
      }
      setLocalStorage(COUNT, "");
    };

    initGroupId();
  }, [hasAccessToken, setGroupId, token]);

  //event handler
  const handleInputClickRoute = (index: number) => {
    router.push(`${SEARCH}?id=${index}`);
  };

  const handleButtonClickGroups = async () => {
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

      let data;

      if (midPointResponse) {
        const isEqual = inputsEqual(
          midPointResponse.start,
          notEmptyAddressList
        );
        if (isEqual) {
          data = midPointResponse;
          router.push(`${MAP}`);
          return;
        }
      }
      data = await MidPointApi.postMidPoint(notEmptyAddressList);

      if (data.start.length <= 1) throw new Error(ERROR_DUPLICATE_START_POINT);

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
      <Main text={MAIN}>
        <Container
          sx={{
            maxHeight: "915px",
            overflow: "auto",
            paddingBottom: "2rem",
          }}>
          <form>
            <Stack
              // spacing={2.5} //layout shift 발생!
              sx={{
                width: "100%",
                alignItems: "center",
                gap: "2rem",
              }}>
              {inputs.map((input, index) => (
                <FormInput
                  key={index}
                  index={index}
                  placeholder='주소 입력'
                  address={input.stationName}
                  onClick={() => !isLoading && handleInputClickRoute(index)}
                  onRemove={(e) => !isLoading && removeInput(e, index)}
                />
              ))}
              {inputs.length < 4 && (
                <IconButton
                  aria-label='add'
                  sx={{ color: "#b4c9bc", aspectRatio: "1/1" }}
                  onClick={(e) => !isLoading && addInput(e)}>
                  <AddIcon />
                </IconButton>
              )}
            </Stack>
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
                width: "100%",
                textAlign: "center",
                "& span": {
                  fontSize: "1.5rem",
                },
              }}>
              <CustomButton
                onClick={debounceMidPoint}
                color='secondary'
                size='large'
                variant='contained'>
                {BUTTON_MID_POINT_TEXT}
              </CustomButton>
              <span>OR</span>
              <CustomButton
                onClick={handleButtonClickGroups}
                color='primary'
                size='large'
                variant='contained'>
                {token && groupId
                  ? BUTTON_GROUPS_ALT_TEXT
                  : BUTTON_GROUPS_DEFAULT_TEXT}
              </CustomButton>
            </Stack>
          </form>
        </Container>
      </Main>
    </>
  );
}

const LoadingContainer = styled.div`
  height: 5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
`;

const CustomButton = styled(Button)`
  font-size: 1.5rem;
`;
