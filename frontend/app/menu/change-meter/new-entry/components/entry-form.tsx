
"use client";
import {useState} from 'react'
import {useForm} from "react-hook-form";
import { NewConnectionType } from "@/types/new-connection";
import InputField from "../../../../common/components/form-field-components/input-field";
import {Zap} from "lucide-react";

const EntryForm = () => {
    const [step, setStep] = useState(0);
    const {register} = useForm<NewConnectionType>(({mode: "all", shouldUnregister: false}));
  return (
    <form className="flex flex-col p-4 gap-4 bg-base-200 card w-full max-w-lg shadow-md">
      <InputField
      required={true}
      Icon={Zap}
      name="account_no"
      register={register}
      label="Account Number"
       />
    </form>
  )
}

export default EntryForm