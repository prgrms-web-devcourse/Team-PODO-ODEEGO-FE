import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { COLORS } from "@/constants/css";
import { ColorProps } from "@/types/css-props";

interface AddressFormInputProps {
  index: number;
  roadAddress: string;
}

const FormInput = ({ index, roadAddress }: AddressFormInputProps) => {
  return (
    <Box
      key={index}
      sx={{ width: "80%", position: "relative", marginBottom: "1.8rem" }}>
      <CustomTextField
        colors={COLORS}
        id='index'
        label={`Address ${index + 1}`}
        sx={{
          width: "100%",
          "& input": {
            height: "2.3rem",
          },
        }}
        disabled
        value={roadAddress}
      />
      {index > 1 && (
        <IconButton
          aria-label='delete'
          sx={{
            position: "absolute",
            right: "0.5rem",
            top: "1.3rem",
            opacity: 0.3,
          }}>
          <ClearIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default FormInput;

const CustomTextField = styled(TextField)<{ colors: ColorProps }>`
  & label {
    color: ${({ colors }) => colors.borderSecondary};
    font-size: 1.5rem;
  }

  & label.Mui-focused {
    color: ${({ colors }) => colors.borderSecondary};
  }

  & .MuiOutlinedInput-root {
    fieldset {
      border-color: ${({ colors }) => colors.borderPrimary};
    }

    &.Mui-focused fieldset {
      border-color: ${({ colors }) => colors.borderSecondary};
    }

    &:hover fieldset {
      border-color: ${({ colors }) => colors.borderSecondary};
    }

    &.Mui-disabled input {
      color: ${({ colors }) => colors.semiBlack};
      -webkit-text-fill-color: ${({ colors }) => colors.semiBlack};
    }

    &.Mui-disabled fieldset {
      border-color: ${({ colors }) => colors.borderSecondary};
    }
  }
`;
