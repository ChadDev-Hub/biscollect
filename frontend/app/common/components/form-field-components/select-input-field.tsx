
"use client";
import { UseFormRegister, FieldPath, FieldValues } from "react-hook-form";
import { ConductorName } from '../../../../types/conductor-wire';

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  register: UseFormRegister<T>;
  label: string;
  required: boolean;
  options: string[] | ConductorName[];
  error?: string;
  disabled?: boolean;
  valueasNumber?: boolean;
}

const SelectInputField = <T extends FieldValues> ({
  name,
  register,
  label,
  required,
  options,
  error,
  disabled,
  valueasNumber
}: Props<T>) => {
  return (
    <section className="w-full space-y-2 ">
      <label className="label font-bold">
        <span className="">{label}</span>
        {required && <span className=" text-red-500">*</span>}
      </label>

      <select disabled={disabled} defaultValue="" className="select select-bordered w-full" {...register(name, {
        valueAsNumber: valueasNumber ?? false,
        required:{ value: required, message: `${label} is required`}})}>
        <option value="" disabled={true}>Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={typeof option === "string" ? option : option.id} >{typeof option === "string" ? option: option.name}</option>
        ))}
      </select>

      {error && <span className="text-red-500 text-xs italic">{error}</span>}
    </section>
  )
}

export default SelectInputField