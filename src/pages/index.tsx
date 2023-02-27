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
import { useRecoilState, useRecoilValue } from "recoil";
import { searchState } from "@/recoil/search-state";
import { MidPointApi } from "@/axios/mid-point";
import { COLORS } from "@/constants/css";
import FormInput from "@/components/home/form-input";
import useTimeoutFn from "@/hooks/use-timeout-fn";
import { accessTokenState } from "@/recoil/acess-token-state";
import { GroupsApi } from "@/axios/groups";

const MAIN_TEXT = "만날 사람 주소를 추가해주세요";
const BUTTON_SUBMIT_TEXT = "중간지점 찾기";

export default function Home() {
  const hasAccessToken = useRecoilValue(accessTokenState) ? true : false;
  const [token, setToken] = useRecoilState(accessTokenState);
  const [groupId, setGroupId] = useState("");
  const [addressList, setAddressList] = useRecoilState(searchState);
  const { inputs, addInput, removeInput } = useMultipleInputs();
  const [isMidPointApiLoading, setIsMidPointApiLoading] = useState(false);
  const [isGroupsApiLoading, setIsGroupsApiLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initGroupId = async () => {
      if (!hasAccessToken) return "";

      const data = await GroupsApi.getAll();
      const groupId = data && data.rooms.length > 0 ? data.rooms[0].roomId : "";

      setGroupId(groupId);
    };

    initGroupId();
  }, [hasAccessToken]);

  const handleInputClickRoute = (index: number) => {
    router.push(`/search?id=${index}`);
  };

  const handleButtonClickGroups = async () => {
    if (isMidPointApiLoading) return;
    if (!hasAccessToken) router.push("/login");
    console.log(token, hasAccessToken);

    setIsGroupsApiLoading(true);
    if (!groupId) {
      //TODO
      // - modal 사용하기
      console.log("call making group api ");
    }

    // router.push(`/groups/${groupId}`);
    await (() => new Promise((r) => setTimeout(r, 1000)))();
    setIsGroupsApiLoading(false);
  };

  const handleButtonClickMiddlePointSubmit = async () => {
    if (isGroupsApiLoading) return;
    setIsMidPointApiLoading(true);

    const addressListCopy = addressList.filter((a) => a.address !== "");
    const filteredAddressList = addressListCopy
      .filter((a) => a.address !== "")
      .map((a) => {
        return {
          name: a.name,
          lat: a.lat,
          lng: a.lng,
        };
      });

    //TODO
    // - 지우기
    console.log("addressList: ", addressList);
    console.log("filteredAddressList: ", filteredAddressList);

    if (filteredAddressList.length < 2) {
      toast.error("주소를 2개 이상 입력해주세요.");
      setIsMidPointApiLoading(false);
      return;
    }

    //TODO
    // - 백엔드 POST api 보내기 & 400에러 처리하기
    // - recoil에 저장하기
    // - 지도 페이지로 넘어가기

    const data = await MidPointApi.postMidPoint();

    console.log(data);

    await (() => new Promise((r) => setTimeout(r, 1000)))();

    setAddressList(addressListCopy);
    setIsMidPointApiLoading(false);
  };

  const { run } = useTimeoutFn({
    fn: async () => {
      handleButtonClickMiddlePointSubmit();
    },
    ms: 500,
  });

  const { run: groupfoo } = useTimeoutFn({
    fn: async () => {
      handleButtonClickGroups();
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
                address={input.address}
                onClick={() => handleInputClickRoute(index)}
                onRemove={removeInput}
              />
            ))}
            {inputs.length < 4 && (
              <IconButton
                aria-label='add'
                sx={{ color: "#b4c9bc" }}
                onClick={(e) => addInput(e)}>
                <AddIcon />
              </IconButton>
            )}
          </Box>
          <Stack
            spacing={1.5}
            sx={{
              width: "80%",
              marginTop: "4rem",
              textAlign: "center",
              "& span": {
                fontSize: "1.5rem",
              },
            }}>
            <Button
              type='button'
              onClick={run}
              variant='contained'
              color='secondary'
              sx={{
                height: "4.5rem",
                borderRadius: "8px",
                textAlign: "center",
              }}>
              {isMidPointApiLoading ? (
                <CircularProgress
                  size='2rem'
                  sx={{
                    color: "white",
                  }}
                />
              ) : (
                <span>{BUTTON_SUBMIT_TEXT}</span>
              )}
            </Button>
            <span>OR</span>
            <Button
              type='button'
              onClick={groupfoo}
              variant='contained'
              color='primary'
              sx={{
                height: "4.5rem",
                borderRadius: "8px",
                textAlign: "center",
              }}>
              {isGroupsApiLoading ? (
                <CircularProgress
                  size='2rem'
                  sx={{
                    color: "white",
                  }}
                />
              ) : (
                <span>{groupId ? "모임 보러가기" : "링크로 주소 받기"}</span>
              )}
            </Button>
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
