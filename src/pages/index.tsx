import Head from "next/head";
import styled, { createGlobalStyle } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { testState } from "@/src/recoil/testState";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

const GlobalStyle = createGlobalStyle`
 h1 {
   font-size: 4rem;
 }
`;
const Container = styled.div`
  text-align: center;
`;
export default function Home() {
  // Recoil Test
  const [recoildData, setRecoilData] = useRecoilState(testState);
  // React-Query Test
  const { data } = useQuery(["todo"], () => {
    return fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
      res.json()
    );
  });

  useEffect(() => {
    setRecoilData(data);
  }, [data, setRecoilData]);

  console.log(recoildData);

  return (
    <>
      <Head>
        <title>SSR styled-components with Next.js Starter</title>
      </Head>

      <Container>
        <GlobalStyle />
        <h1>Hello, world!</h1>
      </Container>
    </>
  );
}
