import LoginButton from "@/components/Button/login-button";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import NavbarWithLogin from "@/components/Navbar/navbar-login";
import { UseUser } from "@/hooks/user-context";
import InputText from "@/components/Input/input-text";

export default function Signup() {
  const { push } = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signup, loading } = UseUser();

  const handleSignup = async () => {
    signup(email, password, username);
  };

  return (
    <>
      <NavbarWithLogin />

      <div className="flex flex-col items-center justify-center w-full h-full gap-10">
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
    </>
  );
}
