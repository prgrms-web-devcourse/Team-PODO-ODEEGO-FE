"use client";

import { colors } from "@/src/constants/css";
import { ColorProps } from "@/src/types/css-props";
import styled from "@emotion/styled";
import { Box, IconButton, TextField } from "@mui/material";
import { MouseEvent } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";

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
          // TODO: 컴포넌트 분리
          <Box
            key={index}
            sx={{ width: "80%", position: "relative", marginBottom: "1.5rem" }}>
            <CustomTextField
              colors={colors}
              id='index'
              label={`Address ${index + 1}`}
              sx={{
                width: "100%",
                height: "3rem",
              }}
              disabled
              value={input.roadAddress}
            />
            {index > 1 && (
              <IconButton
                aria-label='delete'
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 8,
                  opacity: 0.3,
                }}>
                <ClearIcon />
              </IconButton>
            )}
          </Box>
        ))}
        {inputs.length < 4 && (
          <IconButton aria-label='add' sx={{ color: "#b4c9bc" }}>
            <AddIcon />
          </IconButton>
        )}
      </Box>
      <SubmitButton
        type='submit'
        colors={colors}
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
  background-color: ${({ colors }) => colors.orangePrimary};
  color: white;
  text-align: center;
  border-radius: 8px;
  border: none;
  position: absolute;
  bottom: 2.8rem;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
`;

const CustomTextField = styled(TextField)<{ colors: ColorProps }>`
  & label {
    color: ${({ colors }) => colors.greenFocus};
  }

  & label.Mui-focused {
    color: ${({ colors }) => colors.greenFocus};
  }

  & .MuiOutlinedInput-root {
    fieldset {
      border-color: ${({ colors }) => colors.greenLight};
    }

    &.Mui-focused fieldset {
      border-color: ${({ colors }) => colors.greenFocus};
    }

    &:hover fieldset {
      border-color: ${({ colors }) => colors.greenFocus};
    }

    &.Mui-disabled input {
      color: ${({ colors }) => colors.semiBlack};
      -webkit-text-fill-color: ${({ colors }) => colors.semiBlack};
    }

    &.Mui-disabled fieldset {
      border-color: ${({ colors }) => colors.greenFocus};
    }
  }
`;
