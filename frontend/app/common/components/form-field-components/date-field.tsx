"use client";


import { UseFormRegister, FieldValues, Path } from "react-hook-form";




type Props<T extends FieldValues> = {
    register: UseFormRegister<T>;
    error?: string;
    step?: number;
    maxStep?: number
}

const DateField = <T extends FieldValues>({register, error, step, maxStep}: Props<T>) => {
  return (
    <section className={`flex flex-col gap-2 ${step === maxStep ? "block" : "hidden"}`}>
        <label>
            <span className="label font-bold">
                <span className="">Date Accomplished</span>
                <span className=" text-red-500">*</span>
            </span>
        </label>
        <input {...register("date_accomplished" as Path<T>, {required: {
            value: true,
            message: "Date Accomplished is Required"
        }})} title="date" type="date" className="input w-full"/>
        {error && <span className="text-red-500 italic text-xs">{error}</span>}
    </section>
  )
}

export default DateField