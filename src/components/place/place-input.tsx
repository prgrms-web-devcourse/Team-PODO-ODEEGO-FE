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
          marginTop: "2rem",
          width: "100%",
          "& .MuiInputBase-root:before": {
            // borderRadius: "7px",
            // height: 50,
            // border: "0",
            borderBottom: "1px solid rgba(90, 178, 125, .5)",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
        variant='standard'
        inputProps={{
          style: {
            fontSize: "1.7rem",
            border: 0,
            color: "black",
            padding: "1.5rem .5rem",
          },
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
