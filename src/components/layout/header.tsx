import { COLORS } from "@/constants/css";
import styled from "@emotion/styled";
import Image from "next/image";

const HEADER_TEXT = "어디서 만날까?";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/router";
interface HeaderProps {
  userImage?: string;
  token?: string;
}

const Header = ({ userImage, token }: HeaderProps) => {
  console.log(userImage);

  console.log(token);

  const router = useRouter();

  const { pathname } = router;
  console.log(pathname);

  const handleBackClick = () => {
    switch (pathname) {
      case "/signin":
        router.push(`${ROUTES.HOME}`);
        break;
      case "/signup":
        router.push(`${ROUTES.LOGIN}`);
        break;
    }
  };

  return (
    <HeaderContainer>
      {userImage ? (
        <HeaderIconWrap>
          <Image src={userImage} alt='user' width={20} height={30} />
        </HeaderIconWrap>
      ) : (
        <HeaderIconWrap>
          <KeyboardBackspaceIcon onClick={handleBackClick} />
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
