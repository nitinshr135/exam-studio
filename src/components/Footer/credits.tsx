"use client";

import Image from "next/image";
import AppwriteLogo from "../../assets/icons/appwrite-logo.svg";
import NextjsLogo from "../../assets/icons/nextjs-logo.svg";
import GithubLogo from "../../assets/icons/github-mark.svg";

const CreditsFooter = () => {
  return (
    <>
      <div
        className="fixed left-0 bottom-2 w-full
        flex flex-row items-center justify-center
        text-white text-lg font-medium gap-3"
      >
        Made with{" "}
        <Image
          src={AppwriteLogo}
          width={30}
          height={30}
          alt="Appwrite"
          className="cursor-pointer hover:-translate-y-2 hover:shadow-md
          duration-150"
          onClick={() => window.open(`https://cloud.appwrite.io/`, "_blank")}
        />
        and{" "}
        <Image
          src={NextjsLogo}
          width={30}
          height={30}
          alt="Nextjs"
          className="cursor-pointer hover:-translate-y-2 hover:shadow-md
          duration-150"
          onClick={() => window.open(`https://nextjs.org/`, "_blank")}
        />
      </div>
      <Image
        src={GithubLogo}
        width={30}
        height={30}
        alt="Github"
        className="fixed bottom-2 right-10 cursor-pointer hover:-translate-y-2
        hover:shadow-md duration-150"
        onClick={() => window.open(`https://github.com/nitinshr135`, "_blank")}
      />
    </>
  );
};

export default CreditsFooter;
