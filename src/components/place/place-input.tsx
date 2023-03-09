import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import React from "react";
import { COLORS, ROUTES } from "@/constants/css";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

interface PlaceInputProps {
  value: string;
}

const PlaceInput = ({ value }: PlaceInputProps) => {
  const router = useRouter();

  return (
    <>
      <HeaderContainer>
        <KeyboardBackspaceIcon
          sx={{
            color: `${COLORS.mainGreen}`,
            fontSize: "20px",
            cursor: "pointer",
            left: "2rem",
            top: "1.3rem",
          }}
          onClick={() => router.replace(`${ROUTES.MAP}`)}
        />
        <span>{value}</span>
      </HeaderContainer>
    </>
  );
};
export default PlaceInput;

const HeaderContainer = styled.div`
  border-bottom: 2px solid rgba(90, 178, 125, 0.5);
  border-bottom-style: solid !important;
  font-size: 1.7rem;
  color: black;
  padding: 1.3rem 0.5rem;
  position: relative;

  & span {
    margin-left: 1rem;
  }
`;
