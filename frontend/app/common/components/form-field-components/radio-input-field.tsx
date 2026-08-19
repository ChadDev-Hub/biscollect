"use client";

import { FieldValues, UseFormRegister, FieldPath, } from "react-hook-form";
type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  register: UseFormRegister<T>;
  label: string;
  required: boolean;
  options: string[];
  error?: string;
  className?: string;
  selected?: string
};

const CheckBoxFieldOption = <T extends FieldValues>({
  name,
  register,
  label,
  required,
  options,
  error,
  className,
  selected
}: Props<T>) => {
  
  return (
    <section className="w-full space-y-2">
      <label className="label font-bold">
        <span className="">{label}</span>
        {required && <span className=" text-red-500">*</span>}
      </label>
      <div className={className}>
        {options.map((option, index) => (
          <div key={index} className="flex gap-4">
            <label key={option} className={`flex ${selected === option ?   "ring-secondary bg-secondary" : "ring-neutral-600"} cursor-pointer items-center gap-2 p-2 shadow  ring-1 rounded-xs text-center place-content-center text-xs min-w-25`}>
              <input
                hidden
                type="radio"
                
                {...register(name, {
                  required: {
                    value: required,
                    message: `${label} is required`,
                  },
                })}
                value={option}
              />
              <span className={`${selected === option ? 'font-bold' : ''}`}>
              {option}
                </span>
            </label>
          </div>
        ))}
      </div>

      {error && <span className="text-red-500 text-xs italic">{error}</span>}
    </section>
  );
};

export default CheckBoxFieldOption;
