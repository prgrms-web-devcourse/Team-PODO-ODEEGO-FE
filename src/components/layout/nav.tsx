import { COLORS } from "@/constants/css";
import { ColorProps } from "@/types/css-props";
import styled from "@emotion/styled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Nav = () => {
  return (
    <NavContainer colors={COLORS}>
      <AccountCircleIcon />
    </NavContainer>
  );
};

const NavContainer = styled.nav<{ colors: ColorProps }>`
  height: 35px;
  padding: 5px 10px;
  color: white;
  background-color: ${({ colors }) => colors.backgroundAccent};
`;

export default Nav;
