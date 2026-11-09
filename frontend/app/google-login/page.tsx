"use client";
import LoginForm from "./components/loginform";
import ReturnMenu from "@/app/common/components/return-menu";
import Header from "./components/header";
import { Suspense } from "react";
const GooleLoginPage = () => {
  return (
    <div className="flex flex-col items-center  bg-base-300 min-h-screen">
      <div className="w-full p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <ReturnMenu />
        </Suspense>
      </div>

      <Header />

      <LoginForm />
    </div>
  );
};

export default GooleLoginPage;
