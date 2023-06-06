"use client";

import { useRouter } from "next/router";

const NavbarWithLogin = () => {
  const { push, pathname } = useRouter();
  return (
    <div
      className="backdrop-blur-2xl fixed left-0 top-0 w-full py-6 px-6 lg:px-12 border-b border-white-
          flex justify-between items-center flex-row gap-6"
    >
      <h1 className="font-semibold text-base lg:text-xl">Exam Studio</h1>
      <p className="">
        <button
          className="px-10 bg-white border border-black h-9 rounded-full shadow-sm
          font-medium ease-in-out hover:text-white hover:bg-black"
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
