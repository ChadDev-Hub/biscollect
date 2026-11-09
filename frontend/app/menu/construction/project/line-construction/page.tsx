"use client";

import React from "react";
import ReturnButton from "../../../../common/components/return-menu";
import LineConstructionEntryForm from "./component/entry-form";
import {Suspense} from "react";


const NewEntry = () => {
  return (
    <div className="bg-base-300  flex flex-col items-center justify-center">
      <div className="w-full p-4">
        <ReturnButton/>
      </div>
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-15 px-4  min-h-screen">
        <Suspense fallback={<div>Loading...</div>}>
        <LineConstructionEntryForm />
        </Suspense>
      </main>
    </div>
  );
};

export default NewEntry;
