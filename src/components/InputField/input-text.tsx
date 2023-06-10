"use client";

interface IInputText {
  text: string;
  placeholder: string;
  classname?: string;
  type?: string;
  setText: (e: any) => void;
}

const InputText = ({
  text,
  placeholder,
  classname,
  type,
  setText,
}: IInputText) => {
  return (
    <input
      type={type}
      className={`${
        !!classname && classname
      } w-80 h-12 rounded-md px-4 placeholder-[#323232] font-medium text-lg placeholder-opacity-60
          bg-transparent border border-gray-400 outline-none focus:border-black focus:border-2`}
      value={text}
      placeholder={placeholder}
      onChange={(e) => setText(e.target.value)}
    />
  );
};

InputText.defaultProps = {
  type: "text",
  classname: "",
};

export default InputText;
