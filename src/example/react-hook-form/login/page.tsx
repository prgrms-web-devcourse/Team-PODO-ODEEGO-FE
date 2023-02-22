"use client";

import { useRouter } from "next/navigation";
import LoginForm from "./login-form";

const LoginPage = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/");
  };

  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm onSuccess={handleSuccess} />;
    </div>
  );
};

export default LoginPage;
