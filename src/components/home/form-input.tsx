import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { MouseEvent } from "react";
import { COLORS } from "@/constants/css";

interface AddressFormInputProps {
  index: number;
  stationName: string;
  onClick: () => void;
  onRemove: (e: MouseEvent<HTMLButtonElement>, index: number) => void;
}

const FormInput = ({
  index,
  stationName,
  onClick,
  onRemove,
}: AddressFormInputProps) => {
  return (
    <Box
      key={index}
      sx={{ width: "80%", position: "relative", marginBottom: "1.8rem" }}
      onClick={onClick}>
      <CustomTextField
        id='index'
        label={`Address ${index + 1}`}
        sx={{
          width: "100%",
          "& input": {
            height: "2rem",
            fontSize: "1.5rem",
          },
        }}
        disabled
        value={stationName}
      />
      <IconButton
        aria-label='delete'
        sx={{
          position: "absolute",
          right: "0.5rem",
          top: "1.3rem",
          opacity: 0.3,
        }}
        onClick={(e) => onRemove(e, index)}>
        <ClearIcon />
      </IconButton>
    </Box>
  );
};

export default FormInput;

const CustomTextField = styled(TextField)`
  & label {
    color: ${COLORS.borderSecondary};
    font-size: 1.5rem;
  }

  & label.Mui-focused {
    color: ${COLORS.borderSecondary};
  }

  & .MuiOutlinedInput-root {
    fieldset {
      border-color: ${COLORS.borderPrimary};
    }

    &.Mui-focused fieldset {
      border-color: ${COLORS.borderSecondary};
    }

    &:hover fieldset {
      border-color: ${COLORS.borderSecondary};
    }

    &.Mui-disabled input {
      color: ${COLORS.semiBlack};
      -webkit-text-fill-color: ${COLORS.semiBlack};
    }

    &.Mui-disabled fieldset {
      border-color: ${COLORS.borderSecondary};
    }
  }
`;
