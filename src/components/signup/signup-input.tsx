import { InputAdornment, TextField } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import React from "react";
import { errorType, valueType } from "@/types/register-props";

interface SignupInputProps<T, U> {
  values: T;
  handleValue: (arg: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: U;
  handleStationKeyDown: (arg: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SignupInput = ({
  values,
  handleValue,
  errorMessage,
  handleStationKeyDown,
}: SignupInputProps<Partial<valueType>, Partial<errorType>>) => {
  return (
    <>
      <TextField
        style={{
          width: "100%",
        }}
        sx={{
          marginBottom: "10px",
        }}
        inputProps={{
          style: { fontSize: 15 },
        }}
        // name ="name"
        name='nickname'
        // value={nickname}
        value={values.nickname || ""}
        onChange={handleValue}
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
      <TextField
        value={values.station || ""}
        // value={station}
        style={{
          width: "100%",
        }}
        inputProps={{
          style: { fontSize: 15 },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <KeyboardBackspaceIcon />
            </InputAdornment>
          ),
        }}
        name='station'
        // name='address'
        type='text'
        onChange={handleValue}
        onKeyDown={handleStationKeyDown}
      />
    </>
  );
};
export default SignupInput;
