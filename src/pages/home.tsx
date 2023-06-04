import { account } from "@/appwrite/appwriteConfig";
import LoginButton from "@/components/login-button";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const { push } = useRouter();

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
          Good Afternoon Amigos!
          <LoginButton
            choice={"Continue with Login ->"}
            onClick={() => push("/login")}
          />
          <LoginButton
            choice={"Continue as a Guest ->"}
            onClick={() => anonymousSignup()}
          />
          <Link
            href={"/signup"}
            className="flex flex-row gap-1 hover:underline cursor-pointer"
          >
            Already a member? <p className="font-medium">Signup</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
