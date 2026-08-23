"use client";
import { UseFormRegister, FieldPath, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  register: UseFormRegister<T>;
  label: string;
  required?: boolean;
  error?:string;
  isDisabled?: boolean
};

const TextAreaField = <T extends FieldValues>({
  name,
  register,
  label,
  required,
  error,
  isDisabled
}: Props<T>) => {
  return (
    <section className="w-full space-y-2 flex flex-col">
      <label className="label font-bold text-xs">
        <span className="">{label}</span>
        {required && <span className=" text-red-500">*</span>}
      </label>
      <textarea
        disabled={isDisabled}
        placeholder={label}
        className="textarea w-full"
        {...register(name, {
          required: {
            value: required ?? false,
            message: `${label} is required`,
          },
        })}
      ></textarea>
      {error && <span className="text-red-500 text-xs italic">{error}</span>}
    </section>
  );
};

export default TextAreaField;
