import { InputAdornment, TextField } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import React from "react";
import { COLORS } from "@/constants/css";
import { useRouter } from "next/router";
import { ROUTES } from "@/constants";

const PlaceInput = () => {
  const router = useRouter();

  return (
    <>
      <TextField
        sx={{
          marginTop: "2rem",
          width: "100%",
          "& .MuiInputBase-root:before": {
            borderBottom: "2px solid rgba(90, 178, 125, .5)",
            borderBottomStyle: "solid !important",
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
        disabled
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <KeyboardBackspaceIcon
                sx={{
                  color: `${COLORS.mainGreen}`,
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                onClick={() => router.push(`${ROUTES.MAP}`)}
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
