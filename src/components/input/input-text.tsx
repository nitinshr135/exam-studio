"use client";

interface IInputText {
  text: string;
  placeholder: string;
  classname?: string;
  setText: (e: any) => void;
}

const InputText = ({ text, placeholder, classname, setText }: IInputText) => {
  return (
    <input
      type="text"
      className={`${
        !!classname && classname
      } w-80 h-9 rounded-md px-4 placeholder-[#323232] placeholder-opacity-50
          bg-transparent border border-white border-opacity-90 outline-none focus:bg-[#a1c4fd]`}
      value={text}
      placeholder={placeholder}
      onChange={(e) => setText(e.target.value)}
    />
  );
};

export default InputText;
