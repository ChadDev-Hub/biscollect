"use client";

import { UseFormRegister, FieldPath, FieldValues } from "react-hook-form";
import { LucideIcon } from "lucide-react";
type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  register: UseFormRegister<T>;
  label: string;
  required: boolean;
  error?: string;
  inputType?: "text" | "number" | "date";
  Icon: LucideIcon;
  maxStep?: number;
  step?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  patternMessage?: string;
  isDisabled?: boolean;
  listOptionId?:string;
  listOption?: string[];
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
  patternMessage,
  isDisabled,
  listOption,
  listOptionId
}: Props<T>) => {
  return (
    <section
      className={`w-full flex flex-col gap-2 ${maxStep === step ? "block" : "hidden"}`}
    >
      <label className="label font-bold">
        <span className="">{label}</span>
        {required && <span className=" text-red-500">*</span>}
      </label>

      <label className="input w-full px-1 ">
        <div className="py-2">
            <div className="bg-base-200 p-2 rounded-full">
              <Icon className="text-primary size-4" />
            </div>
        </div>
        
        <input
          list={listOptionId}
          disabled={isDisabled}
          
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
        <datalist id={listOptionId}>
          {listOption?.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
      </label>

      {error && <span className="text-red-500 italic text-xs">{error}</span>}
    </section>
  );
};

export default InputField;
