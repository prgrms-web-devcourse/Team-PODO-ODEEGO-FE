import Header from "@/components/home/home-header";
import Main from "@/components/home/home-main";
import useModal from "@/hooks/use-modal";
import { Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  // useModal 훅 사용 예시입니다. 작업할땐 삭제해주세요. (line 9 - line 43)
  const { showModal } = useModal();

  const modalContent = () => {
    return (
      <>
        <p>로그인을 먼저해주세요</p>
        <div>
          <p>로그인을 먼저해주세요</p>
          <p>로그인을 먼저해주세요</p>
        </div>
      </>
    );
  };

  const sleep = (func: () => void, timer: number) => {
    return new Promise(() => {
      setTimeout(() => {
        func();
      }, timer);
    });
  };

  const handleOpenModal = () => {
    showModal({
      children: modalContent(),
      btnText: {
        confirm: "로그인하기",
        close: "취소",
      },
      handleConfirm: async () => {
        await sleep(() => console.log("I want to confirm"), 1000);
      },
    });
  };

  return (
    <>
      <Header />
      <Main />
      <Button onClick={handleOpenModal}>Open Modal</Button>
      <div>
        <Link href='/search'>search</Link>
      </div>
      <div>
        <Link href='/place'>place</Link>
      </div>
    </>
  );
}
