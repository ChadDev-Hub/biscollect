"use client";

import { UseFormRegister, FieldPath } from "react-hook-form";
import { NewConnectionType } from "@/types/new-connection";
import { LucideIcon } from "lucide-react";
type Props = {
  name: FieldPath<NewConnectionType>;
  register: UseFormRegister<NewConnectionType>;
  label: string;
  required: boolean;
  error?: string;
  inputType?: string;
  Icon: LucideIcon;
  maxStep?: number;
  step?: number;
};

const InputField = ({
  name,
  register,
  label,
  required,
  error,
  inputType,
  Icon,
  maxStep,
  step,
}: Props) => {
  return (
    <section className={`w-full flex flex-col gap-2 ${maxStep === step ? "block" : "hidden"}`}>
      <label className="label font-bold">
        <span className="">{label}</span>
        {required && <span className=" text-red-500">*</span>}
      </label>

      <label className="input w-full  ">
        <Icon className="text-base-content size-6" />
        <input
          {...register(name, {
            required: { value: required, message: `${label} is Required` },
          })}
          type={inputType || "text"}
          className="grow"
        />
      </label>

      {error && <span className="text-red-500 italic text-xs">{error}</span>}
    </section>
  );
};

export default InputField;
