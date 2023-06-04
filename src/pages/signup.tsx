import LoginButton from "@/components/login-button";
import { useRouter } from "next/router";
import { useState } from "react";
import { account } from "@/appwrite/appwriteConfig";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import NavbarWithLogin from "@/components/navbar-login";
import InputText from "@/components/input-text";
import { UseUser } from "@/hooks/UserContext";

export default function Signup() {
  const { push } = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signup } = UseUser();

  const handleSignup = async () => {
    signup(email, password, username);
  };

  return (
    <>
      <NavbarWithLogin />

      <div className="flex flex-col items-center justify-center w-full h-full gap-10">
        Signup
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
        <LoginButton choice={"Signup"} onClick={handleSignup} />
        <Link
          href={"/login"}
          className="flex flex-row gap-1 hover:underline cursor-pointer"
        >
          Already a member? <p className="font-medium">Login</p>
        </Link>
      </div>
    </>
  );
}
