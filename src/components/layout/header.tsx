import { COLORS } from "@/constants/css";
import styled from "@emotion/styled";
import Image from "next/image";

const HEADER_TEXT = "어디서 만날까?";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
interface HeaderProps {
  userImage?: string;
  token?: string;
}

const Header = ({ userImage, token }: HeaderProps) => {
  console.log(userImage);

  console.log(token);
  return (
    <HeaderContainer>
      {userImage ? (
        <HeaderIconWrap>
          <Image src={userImage} alt='user' width={20} height={30} />
        </HeaderIconWrap>
      ) : (
        <HeaderIconWrap>
          <KeyboardBackspaceIcon />
        </HeaderIconWrap>
      )}
      <TextP>{HEADER_TEXT}</TextP>
      <Image
        src='/logo1.svg'
        alt='Odeego Logo'
        width={137}
        height={46}
        priority
      />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  height: 17.4rem;
  max-height: 174px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: ${COLORS.backgroundAccent};
  user-select: none;
`;

const TextP = styled.p`
  text-align: center;
  font-size: 12px;
  margin-bottom: 0;
  opacity: 0.7;
`;

const HeaderIconWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-left: 2rem;
  svg {
    font-size: 3rem;
  }
`;
