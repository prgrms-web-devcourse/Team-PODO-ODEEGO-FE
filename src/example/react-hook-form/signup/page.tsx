"use client";

import { useRouter } from "next/navigation";
import SignupForm from "./signup-form";

const Page = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/login");
  };

  return (
    <div>
      <h1>Sign Up Page</h1>
      <SignupForm onSuccess={handleSuccess} />
    </div>
  );
};
export default Page;
