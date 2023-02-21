"use client";

import styled from "@emotion/styled";
import { Box, IconButton } from "@mui/material";
import { MouseEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import FormInput from "./form-input";
import { COLORS } from "@/constants/css";

const BUTTON_SUBMIT_TEXT = "중간지점 찾기";

const AddressForm = () => {
  const inputs = [
    {
      roadAddress: "",
    },
    {
      roadAddress: "",
    },
    {
      roadAddress: "",
    },
    {
      roadAddress: "",
    },
  ];

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
          />
        ))}
        {inputs.length < 4 && (
          <IconButton aria-label='add' sx={{ color: "#b4c9bc" }}>
            <AddIcon />
          </IconButton>
        )}
      </Box>
      <SubmitButton type='submit' onClick={handleButtonClickSubmit}>
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
