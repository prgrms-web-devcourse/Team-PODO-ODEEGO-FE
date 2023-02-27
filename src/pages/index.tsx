import Header from "@/components/home/home-header";
import styled from "@emotion/styled";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import useMultipleInputs from "@/hooks/use-multiple-inputs";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { searchState } from "@/recoil/search-state";
import { MidPointApi } from "@/axios/mid-point";
import { COLORS } from "@/constants/css";
import FormInput from "@/components/home/form-input";
import useTimeoutFn from "@/hooks/use-timeout-fn";

const MAIN_TEXT = "만날 사람 주소를 추가해주세요";
const BUTTON_SUBMIT_TEXT = "중간지점 찾기";

export default function Home() {
  const router = useRouter();
  const [addressList, setAddressList] = useRecoilState(searchState);
  const { inputs, addInput, removeInput } = useMultipleInputs();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputClickRoute = (index: number) => {
    router.push(`/search?id=${index}`);
  };
  const handleButtonClickSubmit = async () => {
    setIsLoading(true);

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
      return;
    }

    //TODO
    // - 백엔드 POST api 보내기 & 400에러 처리하기
    // - recoil에 저장하기
    // - 지도 페이지로 넘어가기

    const data = await MidPointApi.postMidPoint();

    console.log(data);

    setAddressList(addressListCopy);
    setIsLoading(false);
  };

  const [run] = useTimeoutFn({
    fn: async () => {
      handleButtonClickSubmit();
    },
    ms: 500,
  });

  return (
    <>
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
          <SubmitButton type='button' onClick={run}>
            {isLoading ? (
              <CircularProgress
                size='2rem'
                sx={{
                  color: "white",
                }}
              />
            ) : (
              <span>{BUTTON_SUBMIT_TEXT}</span>
            )}
          </SubmitButton>
          <Toaster />
        </Form>
      </MainContainer>
    </>
  );
}
const MainContainer = styled.main`
  width: 100%;
  max-height: 625px;
  height: 76vh;
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
  height: 25px;
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

const SubmitButton = styled.button`
  width: 80%;
  height: 4.8rem;
  background-color: ${COLORS.mainOrange};
  color: white;
  text-align: center;
  border-radius: 8px;
  border: none;
  position: absolute;
  bottom: 3.5rem;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
`;
