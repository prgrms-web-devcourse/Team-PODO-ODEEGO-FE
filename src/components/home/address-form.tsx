import styled from "@emotion/styled";
import { Box, IconButton } from "@mui/material";
import { MouseEvent, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import FormInput from "./form-input";
import { useRouter } from "next/navigation";
import { COLORS } from "@/constants/css";
import useMultipleInputs from "@/hooks/use-multiple-inputs";
import toast, { Toaster } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { searchState } from "@/recoil/search-state";
import axios from "axios";

const BUTTON_SUBMIT_TEXT = "중간지점 찾기";

const AddressForm = () => {
  const router = useRouter();
  const addressList = useRecoilValue(searchState);
  const { inputs, addInput, removeInput } = useMultipleInputs();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputClickRoute = (index: number) => {
    router.push(`/search?id=${index}`);
  };
  const handleButtonClickSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const filteredAddressList = addressList
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

    // const test = async () => {
    //   setIsLoading(true);
    //   await axios({
    //     method: "post",
    //     url: "http://52.78.224.123:8080/api/v1/subway-stations/middle",
    //     data: {
    //       peopleCount: filteredAddressList.length,
    //       stations: [...filteredAddressList],
    //     },
    //   })
    //     .then((res) => {
    //       console.log(res.data);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       toast.error("수도권 내 역으로 검색해주세요");
    //     });

    //   setIsLoading(false);
    // };

    // test();
  };

  return (
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
      <SubmitButton type='submit' onClick={handleButtonClickSubmit}>
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
  );
};

export default AddressForm;

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
