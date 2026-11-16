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
    <fieldset className="w-full space-y-2">
      <label className="fieldset-label font-bold text-xs">
        <span className="">{label}</span> 
        {required && <span className=" text-red-500">*</span>}
      </label>
      <div className={className}>
        {options.map((option, index) => (
          
            <label key={index} className={`flex  ${ selected === option ?  ` ${isDisabled ? 
            'bg-base-200' : 'bg-secondary'} text-white` : '' } hover:cursor-pointer active:border-primary  hover:border-primary border place-content-center rounded-box  w-full `}>
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
    
        ))}
      </div>

      {error && <span className="text-red-500 text-xs italic">{error}</span>}
    </fieldset>
  );
};

export default CheckBoxFieldOption;
