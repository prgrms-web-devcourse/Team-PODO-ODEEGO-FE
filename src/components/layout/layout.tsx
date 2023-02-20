"use client";

import { SIZE } from "../../constants/css";
import styled from "@emotion/styled";
import Nav from "./nav";
import { SizeProps } from "@/types/css-props";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container SIZE={SIZE}>
      <Nav />
      {children}
    </Container>
  );
};

export default Layout;

const Container = styled.div<{ SIZE: SizeProps }>`
  max-height: ${({ SIZE }) => SIZE.height};
  min-width: 320px;
  max-width: ${({ SIZE }) => SIZE.width};
  margin: auto;
  box-sizing: border-box;
`;
