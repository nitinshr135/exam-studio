"use client";

import { UseUser } from "@/hooks/user-context";
import Skeleton from "react-loading-skeleton";
import { ProfileDropdown } from "../Misc/profile-dropdown";
import Image from "next/image";
import NavLogo from "../../assets/icons/nav-logo.svg";
import { useRouter } from "next/router";

const Navbar = () => {
  const { user } = UseUser();
  const { push } = useRouter();
  const loadUserName = () => {
    if (user) return !!user.name ? user.name : user.email;
    return "";
  };

  return (
    <div
      className="backdrop-blur-2xl fixed left-0 top-0 w-full py-6 px-6 lg:px-12 border-b border-white-
          flex justify-between flex-col lg:flex-row gap-6 z-40 bg-indigo-900"
    >
      <Image
        src={NavLogo}
        width={200}
        height={70}
        alt="ExamStudio"
        className="cursor-pointer"
        onClick={() => push("/home")}
      />
      <div className="flex flex-row gap-3 items-center">
        <div className="font-semibold text-lg text-center text-white">
          Welcome {loadUserName()}{" "}
          <span role="img" aria-label="Waving Hand">
            &#x1F64F;
          </span>
        </div>
      </div>
      {true ? (
        <ProfileDropdown />
      ) : (
        <Skeleton
          width={40}
          height={40}
          borderRadius={9999}
          duration={2}
          containerClassName="flex"
        />
      )}
    </div>
  );
};

export default Navbar;
