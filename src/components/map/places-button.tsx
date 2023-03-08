import { COLORS } from "@/constants";
import { SHADOWS } from "@/constants/css";
import styled from "@emotion/styled";
import { Menu } from "@mui/icons-material";
import Link from "next/link";

const PlacesButton = () => {
  return (
    <StyledLink href='/place'>
      <Menu sx={{ color: COLORS.mainGreen, fontSize: "2.2rem" }} />
      주변 장소 목록
    </StyledLink>
  );
};

export default PlacesButton;

const StyledLink = styled(Link)`
  display: flex;
  align-items: flex-end;
  position: fixed;
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
  z-index: 100;
  text-decoration: none;
  color: ${COLORS.textPrimary};
  padding: 0.6rem 1rem;
  border-radius: 3rem;
  box-sizing: border-box;
  background-color: ${COLORS.backgroundSecondary};
  box-shadow: ${SHADOWS.backdropNeutralStrong};
`;
