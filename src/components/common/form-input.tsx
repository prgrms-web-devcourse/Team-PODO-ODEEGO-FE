import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { MouseEvent } from "react";
import { COLORS } from "@/constants/css";

interface AddressFormInputProps {
  index: number;
  address: string;
  placeholder?: string;
  onClick: () => void;
  onRemove?: (e: MouseEvent<HTMLButtonElement>, index: number) => void;
}

const FormInput = ({
  index,
  address,
  placeholder,
  onClick,
  onRemove,
}: AddressFormInputProps) => {
  return (
    <Container index={index}>
      <CustomTextField
        id='index'
        placeholder={placeholder}
        sx={{
          width: "100%",
          "& input": {
            height: "2.3rem",
            fontSize: "1.5rem",
          },
        }}
        disabled
        value={address}
      />
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        onClick={onClick}
      />
      {onRemove && (
        <IconButton
          aria-label='delete'
          sx={{
            position: "absolute",
            right: "0.5rem",
            top: "1.3rem",
            opacity: 0.3,
          }}
          onClick={(e) => onRemove && onRemove(e, index)}>
          <ClearIcon />
        </IconButton>
      )}
    </Container>
  );
};

export default FormInput;

const Container = styled.div<{ index: number }>`
  width: 100%;
  position: relative;
  cursor: pointer;
  animation: ${({ index }) => `fadein ${(index + 1) * 0.2}s ease-in`};

  @keyframes fadein {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const CustomTextField = styled(TextField)`
  background-color: ${COLORS.backgroundSecondary};

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
