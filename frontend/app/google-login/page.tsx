"use client";
import LoginForm from "./components/loginform";
import ReturnMenu from "@/app/common/components/return-menu";
import Header from "./components/header";
const GooleLoginPage = () => {
  return (
    <div className="flex flex-col items-center  bg-base-300 min-h-screen">
      <div className="w-full p-4">
        <ReturnMenu />
      </div>
      
        <Header  />
      
      <LoginForm />
    </div>
  );
};

export default GooleLoginPage;
