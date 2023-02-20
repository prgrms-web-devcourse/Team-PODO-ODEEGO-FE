import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { testState } from "@/recoil/test-state";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

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
        <title>어디서 만날까? ODEEGO</title>
      </Head>
      <h1>Hello, world!</h1>
      <p>What is happening?</p>
    </>
  );
}
