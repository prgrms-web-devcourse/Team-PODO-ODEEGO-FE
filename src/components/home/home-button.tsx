import { COLORS } from "@/constants/css";
import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import { useState } from "react";

const BUTTON_SUBMIT_TEXT = "중간지점 찾기";

const HomeButton = ({ onClick, isLoading }) => {
  return (
    <SubmitButton type='submit' onClick={onClick}>
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
  );
};

export default HomeButton;

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
