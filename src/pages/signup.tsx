import LoginButton from "@/components/Button/login-button";
import { useState } from "react";
import Link from "next/link";
import NavbarWithLogin from "@/components/Navbar/navbar-login";
import { UseUser } from "@/hooks/user-context";
import InputText from "../components/InputField/input-text";
import Lottie from "react-lottie";
import animationData from "../assets/lottie/exam-lottie.json";
import CreditsFooter from "@/components/Footer/credits";

export default function Signup() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signup, loading } = UseUser();

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  const handleSignup = async () => {
    signup(email, password, username);
  };

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
          <h1 className="font-bold text-6xl">Signup</h1>
          <InputText
            text={username}
            setText={setUsername}
            placeholder="Full name"
          />
          <InputText
            text={email}
            setText={setEmail}
            placeholder="Email Address"
          />
          <InputText
            text={password}
            setText={setPassword}
            placeholder="Password"
          />
          <LoginButton
            choice={"Signup"}
            loading={loading}
            onClick={handleSignup}
          />
          <Link
            href={"/login"}
            className="flex flex-row gap-1 hover:underline cursor-pointer font-medium"
          >
            Already a member? <p className="font-semibold">Login</p>
          </Link>
        </div>
      </div>
      <CreditsFooter />
    </>
  );
}
