import Header from "@/components/home/home-header";
import Main from "@/components/home/home-main";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <Link href='/room/1234'>Go to Room</Link>
    </>
  );
}
