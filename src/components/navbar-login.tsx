"use client";

import { useRouter } from "next/router";

const NavbarWithLogin = () => {
  const { push, pathname } = useRouter();
  return (
    <div
      className="backdrop-blur-2xl fixed left-0 top-0 w-full py-6 px-6 lg:px-12 border-b border-white-
          flex justify-between flex-col lg:flex-row gap-6"
    >
      <p className="">Exam Hall</p>
      <p className="">
        <button
          className="px-10 bg-[#0D99FF] h-9 rounded-3xl shadow-sm text-white font-medium hover:opacity-90 ease-in-out"
          onClick={() => {
            pathname === "/signup" ? push("/login") : push("/signup");
          }}
        >
          {pathname === "/signup" ? "Login" : "Signup"}
        </button>
      </p>
    </div>
  );
};

export default NavbarWithLogin;
