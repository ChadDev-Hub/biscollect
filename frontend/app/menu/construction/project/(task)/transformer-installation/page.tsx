
"use client";
import EntryForm from "./components/entry-form";
import { Suspense } from "react";
const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <EntryForm />
    </Suspense>
  )
}

export default Page