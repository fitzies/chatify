"use client";

import Button from "@/components/Button";
import Popup from "@/components/Popup";
import { handleUser } from "@/lib/helper";
import { createUser, getUser, updateUser } from "@/lib/supabase";
import { connectWallet } from "@/lib/web3";
import { UserType } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

const Page = () => {
  const [user, setUser] = useState<UserType>();

  const [needSubmit, setNeedSubmit] = useState(false);
  const [changingImage, setChangingImage] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState<string>();

  const setUsername = (e: any) => {
    const temp = { ...user, username: e.target.value } as UserType;
    setUser(() => temp);
    setNeedSubmit(() => true);
  };

  const setIcon = () => {
    const temp = { ...user, icon: newImageUrl } as UserType;
    setUser(() => temp);
    setChangingImage(() => false);
    setNeedSubmit(() => true);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      handleUser((res: UserType) => {
        setUser(() => res);
      });
    }
  }, []);

  const login = async () => {
    connectWallet()
      .then((accounts: string[]) => {
        localStorage.setItem("user", accounts[0]);
        createUser(accounts[0]);
        handleUser((res: UserType) => {
          setUser(() => res);
        });
      })
      .catch((error: any) => {
        alert(error);
      });
  };

  const submitChanges = () => {
    updateUser(user?.address as string, user?.username as string, user?.icon);
    setNeedSubmit(() => false);
  };

  return (
    <>
      {!user ? (
        <div className="h-screen flex justify-center items-center">
          <div
            className="bg-light rounded-xl border border-[#4d4d64] shadow-2xl p-4 font-bold hover:-translate-y-1 cursor-pointer duration-150"
            onClick={login}
          >
            Login with Metamask
          </div>
        </div>
      ) : (
        <>
          {changingImage ? (
            <Popup>
              <input
                className="bg-transparent px-2 py-1 rounded-md outline-none"
                placeholder="your image url..."
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(() => e.target.value)}
              />
              <Button
                text="Submit"
                type="solid"
                style="w-20 h-10"
                onClick={setIcon}
              />
            </Popup>
          ) : null}
          <div className="w-full h-screen flex flex-col p-12">
            <div className="flex w-full h-[15vh] gap-4 items-center">
              <div className="h-full aspect-square rounded-[50%] bg-secondary relative">
                {!changingImage ? (
                  <div
                    className="w-full h-full rounded-[50%] bg-black opacity-0 duration-150 hover:opacity-50 cursor-pointer absolute"
                    onClick={() => setChangingImage(() => true)}
                  ></div>
                ) : (
                  <div className="w-full h-full rounded-[50%] bg-black opacity-50 cursor-pointer absolute" />
                )}
                {user.icon ? (
                  <img
                    src={user.icon}
                    alt="icon"
                    className="w-full rounded-[50%]"
                  />
                ) : null}
              </div>
              <input
                type="text"
                className="w-2/3 h-1/4 bg-transparent outline-none border border-transparent hover:border-[#4d4d64] rounded-lg duration-100 px-3"
                value={user?.username}
                onChange={setUsername}
              />
            </div>
          </div>
          {needSubmit ? (
            <div
              onClick={submitChanges}
              className="absolute bg-green-800 hover:bg-green-700 hover:shadow-2xl bottom-5 right-5 px-5 py-1 rounded-xl shadow-lg hover:-translate-y-1 duration-150 cursor-pointer"
            >
              Submit
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default Page;
