import { InputAdornment, TextField } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { COLORS } from "@/constants/css";

const PlaceInput = () => {
  return (
    <>
      <TextField
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            borderRadius: "7px",
            height: 50,
            border: "0",
            borderBottom: "1px solid #909090",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
        inputProps={{
          style: { fontSize: 15, border: 0 },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <KeyboardBackspaceIcon
                sx={{
                  color: `${COLORS.mainGreen}`,
                  fontSize: "20px",
                }}
              />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <CloseIcon
                sx={{
                  color: `${COLORS.mainGreen}`,
                  fontSize: "20px",
                }}
              />
            </InputAdornment>
          ),
        }}
        value='강남역'
        type='text'
      />
    </>
  );
};
export default PlaceInput;
