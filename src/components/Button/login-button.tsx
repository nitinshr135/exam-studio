"use client";

import { useState } from "react";

interface ILoginButton {
  choice: string;
  loading: boolean;
  onClick: any;
}

const LoginButton = ({ choice, loading, onClick }: ILoginButton) => {
  const [effect, setEffect] = useState(false);
  const [selected, setSelected] = useState(false);
  return (
    <button
      className={`${
        effect && "animate-click"
      } w-44 px-10 py-2 text-center rounded-full cursor-pointer
        border border-white hover:opacity-90
         bg-black text-white hover:shadow-sm
         flex items-center justify-center relative
         disabled:cursor-not-allowed disabled:opacity-80`}
      onClick={() => {
        setEffect(true);
        setSelected(!selected);
        onClick();
      }}
      disabled={loading}
      onAnimationEnd={() => setEffect(false)}
    >
      {choice}
      {loading && (
        <div
          className="w-5 h-5 rounded-full bg-black animate-spin
      border-t-4 border-4 border-gray-500 border-t-white absolute right-8"
        />
      )}
    </button>
  );
};

export default LoginButton;
