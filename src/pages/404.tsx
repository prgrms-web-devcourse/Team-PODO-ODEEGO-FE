import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();

  const handleClickHomeButton = () => {
    router.push("/");
  };

  return (
    <>
      <h1>404 - Page Not Found</h1>
      <button onClick={handleClickHomeButton}>홈으로 가기</button>
    </>
  );
}
