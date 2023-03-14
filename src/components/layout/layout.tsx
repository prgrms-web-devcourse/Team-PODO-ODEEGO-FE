import { SIZE } from "../../constants/css";
import styled from "@emotion/styled";
import GlobalModal from "@/components/common/global-modal";
import React from "react";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <GlobalModal />
      <Toaster />
      {children}
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  height: 100vh;
  max-height: ${SIZE.height};
  min-width: 320px;
  max-width: ${SIZE.width};
  margin: auto;
  box-sizing: border-box;
  box-shadow: -2px 0 4px -5px #333, 2px 0 4px -5px #333;
`;
