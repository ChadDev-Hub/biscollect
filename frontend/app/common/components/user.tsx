"use client";

import { useEffect, useState } from "react";
import { useOnline } from "@/app/common/components/hooks/online-provider";
import { GetUser } from "@/lib/actions/user";
import {CircleUser} from "lucide-react"
import Image from "next/image";

type UserInfoType = {
  id: string | null;
  first_name: string | null;
  last_name: string | null;
  photo: string | null;
};

const User = () => {
  const { isOnline } = useOnline();
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    id: null,
    last_name: null,
    first_name: null,
    photo: null,
  });
  useEffect(() => {
    // Function TO SET USER INFO
    const setInfo = async ({
      id,
      first_name,
      last_name,
      photo,
    }: UserInfoType) => {
      setUserInfo({
        id: id,
        first_name: first_name,
        last_name: last_name,
        photo: photo,
      });
    };
    if (!isOnline) {
      const user = JSON.parse(
        localStorage.getItem("User") ?? "null",
      ) as UserInfoType | null;

      if (user) {
        setInfo({ ...user });
      }
    } else {
      const callGetUser = async () => {
        const user = await GetUser();
        setInfo({ ...user });
        window.localStorage.setItem("User", JSON.stringify(user));
      };
      callGetUser();
    }
  }, [isOnline]);
  return (
    <div>
      <div className={`avatar aura ${isOnline? "text-green-500": "text-neutral-500"} aura-glow`}>
        <div className="relative size-9 rounded-full overflow-hidden">
          {userInfo.photo ? (
            <Image
              src={userInfo.photo}
              alt="User Profile"
              fill
              className="object-cover"
            />
          ): <CircleUser className="size-9 text-primary-content"/>}
        </div>
      </div>
      <p>{userInfo.first_name}</p>
    </div>
  );
};

export default User;
