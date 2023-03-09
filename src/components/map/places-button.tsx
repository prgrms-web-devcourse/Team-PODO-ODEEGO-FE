import { COLORS } from "@/constants";
import { SHADOWS } from "@/constants/css";
import styled from "@emotion/styled";
import { Menu } from "@mui/icons-material";
import Link from "next/link";

interface PlacesButtonProps {
  stationName: string;
}

const PlacesButton = ({ stationName }: PlacesButtonProps) => {
  return (
    <StyledLink
      href={{
        pathname: "/place",
        query: { stationName },
      }}>
      <Menu sx={{ color: COLORS.mainGreen, fontSize: "2rem" }} />
      <span>주변 장소 목록</span>
    </StyledLink>
  );
};

export default PlacesButton;

const StyledLink = styled(Link)`
  display: flex;
  gap: 0.3rem;
  align-items: center;
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
  font-size: 1.2rem;

  > span {
    display: inline-block;
    height: 1.2rem;
  }
`;
