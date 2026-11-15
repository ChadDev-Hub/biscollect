"use client";

import React from "react";
import LineConstructionEntryForm from "./component/entry-form";
import { Suspense } from "react";

const NewEntry = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LineConstructionEntryForm />
    </Suspense>
  );
};

export default NewEntry;
