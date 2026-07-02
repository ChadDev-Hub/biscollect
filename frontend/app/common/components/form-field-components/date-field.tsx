"use client";

import React from 'react'
import { UseFormRegister } from "react-hook-form";
import { NewConnectionType } from "@/types/new-connection";

type Props = {
    register: UseFormRegister<NewConnectionType>;
    error?: string;
    step?: number;
    maxStep?: number
}

const DateField = ({register, error, step, maxStep}: Props) => {
  return (
    <section className={`flex flex-col gap-2 ${step === maxStep ? "block" : "hidden"}`}>
        <label>
            <span className="label font-bold">
                <span className="">Date Accomplished</span>
                <span className=" text-red-500">*</span>
            </span>
        </label>
        <input {...register("date_accomplished", {required: {
            value: true,
            message: "Date Accomplished is Required"
        }})} title="date" type="date" className="input w-full"/>
        {error && <span className="text-red-500 italic text-xs">{error}</span>}
    </section>
  )
}

export default DateField