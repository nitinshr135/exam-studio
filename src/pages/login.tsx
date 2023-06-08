import LoginButton from "@/components/Button/login-button";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { account } from "@/appwrite/appwriteConfig";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import NavbarWithLogin from "@/components/Navbar/navbar-login";
import InputText from "@/components/Input/input-text";
import { UseUser } from "@/hooks/user-context";

export default function Login() {
  const { push } = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { user, loading, login } = UseUser();

  console.log("USER --", user);
  console.log(
    "YEE PROCESS ENV --",
    process.env.APPWRITE_EXAMINATION_DATABASE_ID
  );

  const handleLogin = async () => {
    login(email, password);
  };

  useEffect(() => {
    if (!!user) push("/home");
  }, [push, user]);

  return (
    <>
      <NavbarWithLogin />
      <div className="flex flex-col items-center justify-center w-full h-full gap-10">
        <h1 className="font-bold text-6xl">Login</h1>
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
    </>
  );
}
