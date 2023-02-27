import Header from "@/components/home/home-header";
import styled from "@emotion/styled";
import { Box, Button, IconButton, Stack } from "@mui/material";
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
import HomeButton from "@/components/home/home-button";
import axios from "axios";
import useModal from "@/hooks/use-modal";

const MAIN_TEXT = "만날 사람 주소를 추가해주세요";
const BUTTON_MID_POINT_TEXT = "중간지점 찾기";
const BUTTON_GROUPS_DEFAULT_TEXT = "링크로 주소 받기";
const BUTTON_GROUPS_ALT_TEXT = "모임 보러가기";

export default function Home() {
  const hasAccessToken = useRecoilValue(accessTokenState) ? true : false;
  const [token, setToken] = useRecoilState(accessTokenState);
  const [groupId, setGroupId] = useState("");
  const [addressList, setAddressList] = useRecoilState(searchState);
  const { inputs, addInput, removeInput } = useMultipleInputs();
  const [isMidPointApiLoading, setIsMidPointApiLoading] = useState(false);
  const [isGroupsApiLoading, setIsGroupsApiLoading] = useState(false);
  const router = useRouter();
  const { openModal } = useModal();

  const modalContent = () => {
    return (
      <>
        <p>몇 명이 모이나요?</p>
        <select>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
        </select>
      </>
    );
  };

  useEffect(() => {
    const initGroupId = async () => {
      if (!hasAccessToken) return "";

      const data = await GroupsApi.getAll();
      const groupId =
        data && data.groups.length > 0 ? data.groups[0].groupId : "";

      setGroupId(groupId);
    };

    initGroupId();
  }, [hasAccessToken]);

  const handleInputClickRoute = (index: number) => {
    router.push(`/search?id=${index}`);
  };

  const handleButtonClickGroups = async () => {
    if (isMidPointApiLoading) return;
    if (!hasAccessToken) {
      router.push("/login");
      return;
    }
    console.log(token, hasAccessToken);

    setIsGroupsApiLoading(true);
    if (!groupId) {
      //TODO
      // - modal 사용하기
      openModal({
        children: modalContent(),
        btnText: {
          confirm: "모임 만들기",
          close: "취소",
        },
        handleConfirm: async () => {
          await (() => new Promise((r) => setTimeout(r, 1000)))();
          console.log("call making group api ");
          // router.push(`/groups/${groupId}`);
        },
      });
    }
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
    // - 백엔드 POST api 보내기
    //    - validation 1) 빈 리스트: 출발지 중복, 2) 400에러 : 수도권 이외의 지역
    // - recoil에 저장하기
    // - 지도 페이지로 넘어가기

    try {
      const data = await MidPointApi.postMidPoint();
      console.log(data);

      const test = await axios.post(
        "http://52.78.224.123:8080/api/v1/mid-points/search",
        {
          stations: [...filteredAddressList],
        }
      );
      console.log(test);

      await (() => new Promise((r) => setTimeout(r, 1000)))();

      setAddressList(addressListCopy);
      setIsMidPointApiLoading(false);
    } catch (e) {
      console.error(e);
      setIsMidPointApiLoading(false);
    }
  };

  const { run: debounceMidPoint } = useTimeoutFn({
    fn: async () => {
      handleButtonClickMiddlePointSubmit();
    },
    ms: 500,
  });

  const { run: debounceGroup } = useTimeoutFn({
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
            <HomeButton
              onClick={debounceMidPoint}
              isLoading={isMidPointApiLoading}
              defaultText={BUTTON_MID_POINT_TEXT}
              color='secondary'
            />
            <span>OR</span>
            <HomeButton
              onClick={debounceGroup}
              isLoading={isGroupsApiLoading}
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
