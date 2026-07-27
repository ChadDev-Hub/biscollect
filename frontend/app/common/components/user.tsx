"use client";

import { useEffect, useState } from "react";
import { useOnline } from "@/app/common/components/hooks/online-provider";
import { GetUser } from "@/lib/actions/user";
type UserInfoType = {
  name: string | null;
  profile: string | null;
};

const User = () => {
  const { isOnline } = useOnline();
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    name: null,
    profile: null,
  });
  useEffect(() => {
    // Function TO SET USER INFO
    const setInfo = async (name: string | null, profile: string | null) => {
      setUserInfo({
        name: name,
        profile: profile,
      });
    };
    if (!isOnline) {
      const userName = window.localStorage.getItem("user_name");
      const userProfile = window.localStorage.getItem("user_profile");
      if (userName && userProfile) {
        setInfo(userName, userProfile);
      }
    } else {
      const callGetUser = async () => {
        const user = await GetUser();
        setInfo(user.name, user.profile);
        window.localStorage.setItem("user_name", user.name || "");
        window.localStorage.setItem("user_profile", user.profile || "");
      };
      callGetUser();
    }
  }, [isOnline]);
  console.log(userInfo);
  return <div>User</div>;
};

export default User;
