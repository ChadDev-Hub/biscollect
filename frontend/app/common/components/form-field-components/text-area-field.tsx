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
    <fieldset className="w-full space-y-2 flex flex-col">
      <label className="fieldset-label font-bold text-md">
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
    </fieldset>
  );
};

export default TextAreaField;
