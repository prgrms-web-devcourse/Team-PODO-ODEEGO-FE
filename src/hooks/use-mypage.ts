import { getLocalStorage, removeLocalStorage } from "@/utils/storage";
import { axiosInstanceWitToken } from "@/axios/instance";
import { ROUTES } from "@/constants";
import { useRouter } from "next/router";
import useModal from "@/hooks/use-modal";

const useMypage = () => {
  const router = useRouter();
  const { openModal } = useModal();

  const handleClickAccount = () => {
    openModal({
      children: "회원탈퇴 하시겠습니까?.",
      btnText: {
        confirm: "회원탈퇴",
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
        const odeegoLogoutUrl = `/api/odeego-leave`;
        const response = await axiosInstanceWitToken.delete(odeegoLogoutUrl);

        removeLocalStorage("token");
        removeLocalStorage("logoutToken");
        router.push(`${ROUTES.HOME}`);

        return response;
      },
    });
  };

  const handleClickLogout = async () => {
    const logoutToken = getLocalStorage("logoutToken");
    try {
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
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  return { handleClickAccount, handleClickLogout };
};
export default useMypage;
