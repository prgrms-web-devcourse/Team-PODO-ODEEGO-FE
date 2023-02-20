"use client";

import { colors, size } from "../../constants/css";
import styled from "@emotion/styled";
import Nav from "./nav";
import { ColorProps, SizeProps } from "@/src/types/css-props";

export interface cssProps {
  size: SizeProps;
  colors: ColorProps;
}

const cssProps = {
  size: size,
  colors: colors,
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container cssProps={cssProps}>
      <Nav />
      {children}
    </Container>
  );
};

export default Layout;

const Container = styled.div<{ cssProps: cssProps }>`
  max-height: ${({ cssProps }) => cssProps.size.height};
  min-width: 320px;
  max-width: ${({ cssProps }) => cssProps.size.width};
  margin: auto;
  background-color: ${({ cssProps }) => cssProps.colors.greenPrimary};
  box-sizing: border-box;
`;
