"use client";

import { UseFormRegister, FieldPath } from "react-hook-form";
import {NewConnectionType} from "@/types/new-connection";

type Props = {
  name: FieldPath<NewConnectionType>;
  register: UseFormRegister<NewConnectionType>;
  label: string;
  required: boolean;
  error?: string;
  inputType?: string
};

const InputField = ({ name,register, label, required, error, inputType}: Props) => {
 
  return (
      <section className="w-full flex flex-col gap-2">
        <label className="label font-bold">
          <span className="">{label}</span>
          {required && <span className=" text-red-500">*</span>}
        </label>
        <input
          {...register(name, {required: {value: required, message: `${label} is Required`}})}
          type={inputType || "text"}  
          className="input w-full"
        />
        {error && <span className="text-red-500 italic text-xs">{error}</span>}
      </section>
    
  );
};

export default InputField;
