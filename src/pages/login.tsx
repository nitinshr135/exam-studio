import LoginButton from "@/components/login-button";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { account } from "@/appwrite/appwriteConfig";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { UseUser } from "@/hooks/UserContext";
import NavbarWithLogin from "@/components/navbar-login";
import InputText from "@/components/input-text";

export default function Login() {
  const { push } = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { user, login } = UseUser();

  console.log("USER --", user);

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
        Login
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
        <LoginButton choice={"Login"} onClick={() => handleLogin()} />
        <Link
          href={"/signup"}
          className="flex flex-row gap-1 hover:underline cursor-pointer"
        >
          Not a member? <p className="font-medium">Signup</p>
        </Link>
      </div>
    </>
  );
}
