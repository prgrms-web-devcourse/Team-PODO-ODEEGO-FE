import AddressForm from "@/components/home/address-form";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";
import useModal from "@/hooks/use-modal";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  // useModal 훅 사용 예시입니다. 작업할땐 삭제해주세요. (line 9 - line 39)
  const { openModal } = useModal();
  const router = useRouter();

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

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const handleOpenModal = () => {
    openModal({
      children: modalContent(),
      btnText: {
        confirm: "로그인하기",
        close: "취소",
      },
      handleConfirm: async () => {
        await sleep(1000);
        router.push("/search");
      },
    });
  };

  const MAIN_TEXT = "만날 사람 주소를 추가해주세요";

  return (
    <>
      <Header />
      <Main text={MAIN_TEXT}>
        <AddressForm />
      </Main>
      <Link href='/group/bb644fe4-8f34-4775-882a-c1d2ee01f322'>TEST GROUP</Link>
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
