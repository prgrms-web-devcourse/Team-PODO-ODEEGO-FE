import { useRouter } from "next/router";
import { ROUTES } from "@/constants/routes";

const SignupLogout = () => {
  const token = localStorage.getItem("logoutToken" || "");

  const route = useRouter();
  const handleLogout = async () => {
    try {
      const res = await fetch(`/api/kakao-logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });
      route.push(`${ROUTES.HOME}`);

      return res;
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <button>
        <h1 onClick={handleLogout}>로그아웃 버튼</h1>
      </button>
    </>
  );
};
export default SignupLogout;
