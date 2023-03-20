import useModal from "@/hooks/use-modal";
import { getLocalStorage, removeLocalStorage } from "@/utils/storage";
import { useRouter } from "next/router";
import { ROUTES } from "@/constants";

const useLogin = () => {
  const { openModal } = useModal();
  const token = getLocalStorage("logoutToken");

  const router = useRouter();

  const handleKakaoLogin = () => {
    if (token) {
      openModal({
        children: "이미 로그인 되어있습니다.",
        btnText: {
          confirm: "로그아웃",
          close: "취소",
        },
        handleConfirm: async () => {
          const logoutToken = getLocalStorage("logoutToken");
          const kakaoLogoutUrl = `/api/kakao-logout`;
          await fetch(kakaoLogoutUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              logoutToken,
            }),
          });

          removeLocalStorage("token");
          removeLocalStorage("logoutToken");
          router.push(`${ROUTES.HOME}`);

          // return response;
        },
      });
    } else {
      window.Kakao.Auth.authorize({
        //개인 테스트용 리다이랙션 주소
        // redirectUri: "http://localhost:3000/kakao",
        // 배포 리다이랙션 주소 Production

        redirectUri: "https://odeego.vercel.app/kakao",
        // 배포 리다이랙션 주소 Preview
        // redirectUri:
        // "https://team-podo-odeego-fe-git-feature-signin-seung-hwan285.vercel.app/kakao",
      });
    }
  };

  return {
    handleKakaoLogin,
  };
};
export default useLogin;
