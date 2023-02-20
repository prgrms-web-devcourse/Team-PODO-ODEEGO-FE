import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, TextField } from "@mui/material";
import { ColorProps } from "@/src/types/css-props";
import { colors } from "@/src/constants/css";
import styled from "@emotion/styled";
import { MouseEvent } from "react";

interface AddressFormInputProps {
  index: number;
  roadAddress: string;
  onClick: () => void;
  onRemove: (e: MouseEvent<HTMLButtonElement>, index: number) => void;
}

const FormInput = ({
  index,
  roadAddress,
  onClick,
  onRemove,
}: AddressFormInputProps) => {
  return (
    <Box
      key={index}
      sx={{ width: "80%", position: "relative", marginBottom: "1.5rem" }}
      onClick={onClick}>
      <CustomTextField
        colors={colors}
        id='index'
        label={`Address ${index + 1}`}
        sx={{
          width: "100%",
          height: "3rem",
        }}
        disabled
        value={roadAddress}
      />
      {index > 1 && (
        <IconButton
          aria-label='delete'
          sx={{
            position: "absolute",
            right: 0,
            top: 8,
            opacity: 0.3,
          }}
          onClick={(e) => onRemove(e, index)}>
          <ClearIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default FormInput;

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
