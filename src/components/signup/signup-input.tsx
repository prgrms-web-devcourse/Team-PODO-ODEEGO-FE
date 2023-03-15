import { InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import React from "react";
import { errorType, valueType } from "@/types/register-props";
import { COLORS } from "@/constants";
import styled from "@emotion/styled";

interface SignupInputProps<T, U> {
  values: T;
  handleValue: (arg: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: U;
  handleStationKeyDown: (arg: React.KeyboardEvent<HTMLInputElement>) => void;
}

const label = {
  nickname: "닉네임을 입력해주세요",
  station: "가까운 지하철역을 입력해주세요",
};

const SignupInput = ({
  values,
  handleValue,
  errorMessage,
  handleStationKeyDown,
}: SignupInputProps<Partial<valueType>, Partial<errorType>>) => {
  return (
    <>
      <CustomTextField
        // name ="name"
        name='nickname'
        // value={nickname}
        value={values.nickname || ""}
        onChange={handleValue}
        placeholder={label.nickname}
      />

      {errorMessage.nickname ? (
        <p
          style={{
            marginBottom: "20px",
          }}>
          {errorMessage.nickname || ""}
        </p>
      ) : (
        <p
          style={{
            marginBottom: "20px",
          }}>
          {errorMessage.nickname_len || ""}
        </p>
      )}

      {/*  태스트용*/}
      {/*  pull error*/}
      <CustomTextField
        value={values.defaultStationName || ""}
        placeholder={label.station}
        name='defaultStationName'
        type='text'
        onChange={handleValue}
        onKeyDown={handleStationKeyDown}
        sx={{ zIndex: "100" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search fontSize='large' sx={{ color: COLORS.altGreen }} />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};
export default SignupInput;

const CustomTextField = styled(TextField)`
  width: 100%;
  background-color: ${COLORS.backgroundSecondary};

  & .MuiOutlinedInput-root {
    fieldset {
      border-color: ${COLORS.borderPrimary};
    }

    &.Mui-focused fieldset {
      border-color: ${COLORS.mainGreen};
    }

    &:hover fieldset {
      border-color: ${COLORS.mainGreen};
    }

    & input {
      color: ${COLORS.semiBlack};
      font-size: 1.5rem;
      -webkit-text-fill-color: ${COLORS.semiBlack};
    }
  }
`;
