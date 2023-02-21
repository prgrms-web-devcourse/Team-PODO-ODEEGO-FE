import { COLORS } from "@/constants/css";
import styled from "@emotion/styled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Nav = () => {
  return (
    <NavContainer>
      <AccountCircleIcon />
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  height: 35px;
  padding: 5px 10px;
  color: white;
  background-color: ${COLORS.backgroundAccent};
`;

export default Nav;
