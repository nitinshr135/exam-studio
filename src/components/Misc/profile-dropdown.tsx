import { Fragment, useMemo } from "react";
import Image from "next/image";
import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";
import { UseUser } from "@/hooks/user-context";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

export const ProfileDropdown = () => {
  const { user, logout } = UseUser();
  const { push } = useRouter();

  const avatar = useMemo(() => {
    return createAvatar(pixelArt, {
      size: 128,
      seed: user?.$id,
      radius: 50,
      backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
      backgroundType: ["gradientLinear"],
    }).toDataUriSync();
  }, [user]);

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className="inline-flex w-full justify-center
          text-sm font-medium text-white rounded-full
          border-2 border-white border-opacity-70 hover:border-opacity-100
          focus:outline-none focus-visible:ring-2 duration-200 ease-in-out
          focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <Image src={avatar} width={50} height={50} alt="avatar" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className="absolute right-0 mt-2 w-56 origin-top-right divide-y
          divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5
          focus:outline-none font-medium"
          >
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-slate-200" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => push("/history")}
                  >
                    Exam History
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className="text-gray-400 group flex w-full items-center
                    rounded-md px-2 py-2 text-sm cursor-not-allowed"
                  >
                    Profile (Coming Soon)
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-slate-200" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => logout()}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
