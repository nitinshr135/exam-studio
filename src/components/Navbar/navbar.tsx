"use client";

import { UseUser } from "@/hooks/user-context";

const Navbar = () => {
  const { user, logout } = UseUser();
  const loadUserName = () => {
    if (user) return !!user.name ? user.name : user.email;
    return "";
  };
  return (
    <div
      className="backdrop-blur-2xl fixed left-0 top-0 w-full py-6 px-6 lg:px-12 border-b border-white-
          flex justify-between flex-col lg:flex-row gap-6"
    >
      <div className="flex flex-row gap-3 items-center">
        <div className="font-semibold text-lg text-center">
          Hi {loadUserName()}{" "}
          <span role="img" aria-label="Waving Hand">
            &#x1F44B;
          </span>
        </div>
      </div>
      <button
        className="px-10 bg-[#0D99FF] h-9 rounded-3xl shadow-sm text-white font-medium hover:opacity-90 ease-in-out"
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
