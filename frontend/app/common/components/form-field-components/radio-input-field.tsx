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
  isDisabled?: boolean
};

const CheckBoxFieldOption = <T extends FieldValues>({
  name,
  register,
  label,
  required,
  options,
  error,
  className,
  selected,
  isDisabled
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
            <label key={option} className={`flex ${ selected === option ?  ` ${isDisabled ? 
              "ring-neutral-600 bg-neutral-400 cursor-not-allowed" : "ring-secondary bg-secondary cursor-pointer"
            }`  : "ring-neutral-600"}     items-center gap-2 p-2 shadow  ring-1 rounded-xs text-center place-content-center text-xs min-w-25`}>
              <input
                disabled ={isDisabled}
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
