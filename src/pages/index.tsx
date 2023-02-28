import Header from "@/components/home/home-header";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import useMultipleInputs from "@/hooks/use-multiple-inputs";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { searchState } from "@/recoil/search-state";
import { MidPointApi } from "@/axios/mid-point";
import { COLORS } from "@/constants/css";
import FormInput from "@/components/home/form-input";
import useTimeoutFn from "@/hooks/use-timeout-fn";
import { accessTokenState } from "@/recoil/acess-token-state";
import { GroupsApi } from "@/axios/groups";
import HomeButton from "@/components/home/home-button";
import useModal from "@/hooks/use-modal";
import { MidPointState } from "@/recoil/midpoint-state";
import SelectModal from "@/components/home/select-modal";
import LoginConfirmModal from "@/components/home/login-modal";
import { countState } from "@/recoil/count-state";

const MAIN_TEXT = "만날 사람 주소를 추가해주세요";
const BUTTON_MID_POINT_TEXT = "중간지점 찾기";
const BUTTON_GROUPS_DEFAULT_TEXT = "링크로 주소 받기";
const BUTTON_GROUPS_ALT_TEXT = "모임 보러가기";

export default function Home() {
  const [groupId, setGroupId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const hasAccessToken = useRecoilValue(accessTokenState) ? true : false;
  const [token, setToken] = useRecoilState(accessTokenState);
  const count = useRecoilValue(countState);
  const [addressList, setAddressList] = useRecoilState(searchState);
  const setMidPointResponse = useSetRecoilState(MidPointState);
  const { inputs, addInput, removeInput } = useMultipleInputs();
  const router = useRouter();
  const { openModal } = useModal();

  const loginModalConfig = {
    children: <LoginConfirmModal />,
    btnText: {
      confirm: "로그인하기",
      close: "취소",
    },
    handleConfirm: async () => {
      router.push("/login");
    },
  };

  const selectModalConfig = {
    children: <SelectModal />,
    btnText: {
      confirm: "모임 만들기",
      close: "취소",
    },
    handleConfirm: async () => {
      await (() => new Promise((r) => setTimeout(r, 3000)))();
      //TODO: count parseINt, 및 ""이 아닐 때, api call
      console.log("call making group api:  ", count);
      console.log("set group id");
      console.log("go to the group page");
      setIsLoading(false);
    },
    handleClose: () => {
      setIsLoading(false);
    },
  };

  useEffect(() => {
    const initGroupId = async () => {
      if (!hasAccessToken) return "";

      const data = await GroupsApi.getAll();
      const groupId = data?.groups?.[0]?.groupId || "";

      setGroupId(groupId);
    };

    initGroupId();
  }, [hasAccessToken]);

  const handleInputClickRoute = (index: number) => {
    router.push(`/search?id=${index}`);
  };

  const handleButtonClickGroups = async () => {
    if (isLoading) return;
    if (!hasAccessToken) {
      openModal(loginModalConfig);
      return;
    }
    if (groupId) {
      //router.push(`/group/${groupId}`);
      console.log("go to the group page");
      return;
    }

    setIsLoading(true);
    openModal(selectModalConfig);
    setIsLoading(false);
  };

  const handleButtonClickMiddlePointSubmit = async () => {
    if (isLoading) return;

    const addressListCopy = addressList.filter((a) => a.name !== "");
    if (addressListCopy.length < 2) {
      toast.error("주소를 2개 이상 입력해주세요.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const data = await MidPointApi.postMidPoint(addressListCopy);
    await (() => new Promise((r) => setTimeout(r, 3000)))();

    setIsLoading(false);

    if (data.status === 400) {
      toast.error("수도권 내의 범위로 출발지를 입력해주세요.");
    } else if (data.start.length < 2) {
      toast.error("중복 출발지입니다.");
    } else {
      console.log(token);
      setMidPointResponse(data);
      router.push("/map");
    }

    setAddressList(addressListCopy);
  };

  const { run: debounceMidPoint } = useTimeoutFn({
    fn: async () => {
      handleButtonClickMiddlePointSubmit();
    },
    ms: 500,
  });

  return (
    <>
      <Button onClick={() => setToken("hello")}>Set Token</Button>
      <Button onClick={() => setGroupId("hello")}>Set GroupID</Button>
      <Header />
      <MainContainer>
        <BorderContainer />
        <TextP>{MAIN_TEXT}</TextP>
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
                name={input.name}
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
