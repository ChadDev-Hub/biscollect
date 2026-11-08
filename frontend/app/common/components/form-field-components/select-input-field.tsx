"use client";
import { UseFormRegister, FieldPath, FieldValues } from "react-hook-form";
import { ConductorName } from "../../../../types/conductor-wire";
import { LucideIcon } from "lucide-react";
type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  register: UseFormRegister<T>;
  label: string;
  required: boolean;
  options: string[] | ConductorName[];
  error?: string;
  disabled?: boolean;
  valueasNumber?: boolean;
  Icon?: LucideIcon;
};

const SelectInputField = <T extends FieldValues>({
  name,
  register,
  label,
  required,
  options,
  error,
  disabled,
  valueasNumber,
  Icon,
}: Props<T>) => {
  return (
    <fieldset className="w-full fieldset space-y-2 ">
      <label className="fieldset-label font-bold">
        <span className="">{label}</span>
        {required && <span className=" text-red-500">*</span>}
      </label>

      <label className="select space-x-2 w-full px-1">
        
          <div className="bg-base-200 p-2 rounded-full">
            {Icon && <Icon className="text-primary size-4" />}
          </div>
        
        <select
          disabled={disabled}
          defaultValue=""
          className="grow"
          {...register(name, {
            valueAsNumber: valueasNumber ?? false,
            required: { value: required, message: `${label} is required` },
          })}
        >
          <option value="" disabled={true}>
            Select {label}
          </option>
          {options.map((option, index) => (
            <option
              key={index}
              value={typeof option === "string" ? option : option.id}
            >
              {typeof option === "string" ? option : option.name}
            </option>
          ))}
        </select>
      </label>

      {error && <span className="text-red-500 text-xs italic">{error}</span>}
    </fieldset>
  );
};

export default SelectInputField;
