"use client";

import { UseFormRegister, FieldPath, FieldValues } from "react-hook-form";
import { LucideIcon } from "lucide-react";
type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  register: UseFormRegister<T>;
  label: string;
  required: boolean;
  error?: string;
  inputType?: string;
  Icon: LucideIcon;
  maxStep?: number;
  step?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  patternMessage?: string;
};

const InputField =<T extends FieldValues> ({
  name,
  register,
  label,
  required,
  error,
  inputType,
  Icon,
  maxStep,
  step,
  minLength,
  maxLength,
  pattern,
  patternMessage

}: Props<T>) => {
  return (
    <section
      className={`w-full flex flex-col gap-2 ${maxStep === step ? "block" : "hidden"}`}
    >
      <label className="label font-bold">
        <span className="">{label}</span>
        {required && <span className=" text-red-500">*</span>}
      </label>

      <label className="input w-full  ">
        <Icon className="text-base-content size-6" />
        <input
          {...register(name, {
            required: { value: required, message: `${label} is Required` },
            ...(minLength && {
              minLength: {
                value: minLength,
                message: `${label} must be at least ${minLength} characters long`,
              },
            }),
            ...(maxLength && {
              maxLength: {
                value: maxLength,
                message: `${label} must be at most ${maxLength} characters long`,
              },
            }),
            ...(pattern && {
              pattern: {
                value: pattern,
                message: `${patternMessage}`,
              },
            })
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
