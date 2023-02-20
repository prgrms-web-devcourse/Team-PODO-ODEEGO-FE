import styled from "@emotion/styled";
import Image from "next/image";

const HEADER_TEXT = "어디서 만날까?";

const Header = () => {
  return (
    <HeaderContainer>
      <TextP>{HEADER_TEXT}</TextP>
      <Image
        src='/Logo.png'
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
  min-height: 174px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const TextP = styled.p`
  text-align: center;
  font-size: 12px;
  margin-bottom: 0;
  opacity: 0.7;
`;
