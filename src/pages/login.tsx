import LoginButton from "@/components/Button/login-button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import NavbarWithLogin from "@/components/Navbar/navbar-login";
import { UseUser } from "@/hooks/user-context";
import InputText from "../components/InputField/input-text";
import Lottie from "react-lottie";
import animationData from "../assets/lottie/exam-lottie.json";
import CreditsFooter from "@/components/Footer/credits";

export default function Login() {
  const { push } = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  const { user, loading, login } = UseUser();

  const handleLogin = async () => {
    login(email, password);
  };

  useEffect(() => {
    if (!!user) push("/home");
  }, [push, user]);

  return (
    <>
      <NavbarWithLogin />
      <div className="flex flex-col sm:flex-row justify-between w-full lg:mt-10">
        <div className="sm:w-1/2 z-10">
          <Lottie options={lottieOptions} height={400} width={400} />
        </div>
        <div
          className="flex flex-col items-center gap-10 text-white
        sm:w-1/2"
        >
          <h1 className="font-bold text-6xl text-white">Login</h1>
          <InputText
            text={email}
            setText={setEmail}
            placeholder="Email Address"
          />
          <InputText
            type="password"
            text={password}
            setText={setPassword}
            placeholder="Password"
          />
          <LoginButton
            choice={"Login"}
            loading={loading}
            onClick={() => handleLogin()}
          />
          <Link
            href={"/signup"}
            className="flex flex-row gap-1 hover:underline cursor-pointer font-medium"
          >
            Don&apos;t have an account? <p className="font-semibold">Signup</p>
          </Link>
        </div>
      </div>
      <CreditsFooter />
    </>
  );
}
