
"use client";
import { UseFormRegister, FieldPath, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  register: UseFormRegister<T>;
  label: string;
  required: boolean;
  options: string[];
  error?: string;
  disabled?: boolean
}

const SelectInputField = <T extends FieldValues> ({
  name,
  register,
  label,
  required,
  options,
  error,
  disabled
}: Props<T>) => {
  return (
    <section className="w-full space-y-2 ">
      <label className="label font-bold">
        <span className="">{label}</span>
        {required && <span className=" text-red-500">*</span>}
      </label>

      <select disabled={disabled} defaultValue="" className="select select-bordered w-full" {...register(name, {required:{ value: required, message: `${label} is required`}})}>
        <option value="" disabled={true}>Select {label}</option>
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>

      {error && <span className="text-red-500 text-xs italic">{error}</span>}
    </section>
  )
}

export default SelectInputField