import { account } from "@/appwrite/appwriteConfig";
import LoginButton from "@/components/login-button";
import Navbar from "@/components/navbar";
import { UseUser } from "@/hooks/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const { push } = useRouter();
  const { user } = UseUser();

  const anonymousSignup = async () => {
    const promise = account.createAnonymousSession();

    promise.then(
      function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col text-left w-full h-full gap-10 mt-10">
        <h1 className="font-bold text-xl">Global Tests</h1>
        1. UPSC CSE 2023 Prelims Question
      </div>
    </>
  );
}
