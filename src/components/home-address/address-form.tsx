"use client";

import styled from "@emotion/styled";
import { Box, IconButton } from "@mui/material";
import { MouseEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import FormInput from "./form-input";
import { useRouter } from "next/navigation";
import { COLORS } from "@/constants/css";
import { ColorProps } from "@/types/css-props";
import useMultipleInputs from "@/hooks/useMultipleInputs";

const BUTTON_SUBMIT_TEXT = "중간지점 찾기";

const AddressForm = () => {
  const router = useRouter();
  const { inputs, addInput, removeInput } = useMultipleInputs();

  const handleInputClickRoute = (index: number) => {
    //해당 주소폼이 수정되도록 id를 쿼리로 넘겨줌
    router.push(`/search?index=${index}`);
  };
  const handleButtonClickSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
            roadAddress={input.roadAddress}
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
      <SubmitButton
        type='submit'
        colors={COLORS}
        onClick={handleButtonClickSubmit}>
        {BUTTON_SUBMIT_TEXT}
      </SubmitButton>
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

const SubmitButton = styled.button<{ colors: ColorProps }>`
  width: 80%;
  height: 3rem;
  background-color: ${({ colors }) => colors.mainOrange};
  color: white;
  text-align: center;
  border-radius: 8px;
  border: none;
  position: absolute;
  bottom: 2.8rem;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
`;
