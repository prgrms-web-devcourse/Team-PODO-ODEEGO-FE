import Header from "@/components/home/home-header";
import Main from "@/components/home/home-main";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <Main />

      <div>
        <Link href='/search'>search</Link>
      </div>
      <div>
        <Link href='/place'>place</Link>
      </div>
    </>
  );
}
