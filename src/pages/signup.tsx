import LoginButton from "@/components/login-button";
import { useRouter } from "next/router";
import { useState } from "react";
import { account } from "@/appwrite/appwriteConfig";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

export default function Signup() {
  const { push } = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // signup

  const signupStudent = async (e: any) => {
    const promise = account.create(uuidv4(), email, password, username);

    promise.then(
      function (response) {
        console.log("response --", response);
        push("/login");
      },
      function (error) {
        console.log("error --", error);
      }
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-32 lg:py-24 px-6 lg:px-12 bg-[#6096B4]">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div
          className="backdrop-blur-2xl fixed left-0 top-0 w-full py-6 px-6 lg:px-12 border-b border-gray-300
          flex justify-between flex-col lg:flex-row gap-6"
        >
          <p className="">Welcome User</p>
          <p className="">Nitin Sharma</p>
        </div>

        <div className="flex flex-col items-center justify-center w-full h-full gap-10">
          Signup
          <input
            type="text"
            className="text-black bg-white h-8 rounded-lg p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            className="text-black bg-white h-8 rounded-lg p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginButton
            choice={"Signup"}
            onClick={(e: any) => signupStudent(e)}
          />
          <Link
            href={"/login"}
            className="flex flex-row gap-1 hover:underline cursor-pointer"
          >
            Already a member? <p className="font-medium">Login</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
